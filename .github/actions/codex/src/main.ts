#!/usr/bin/env bun

import type { Config } from "./config";

import { defaultContext, EnvContext } from "./env-context";
import { loadConfig } from "./load-config";
import { setGitHubActionsUser } from "./git-user";
import { onLabeled } from "./process-label";
import { ensureBaseAndHeadCommitsForPRAreAvailable } from "./prompt-template";
import { performAdditionalValidation } from "./verify-inputs";
import { onComment } from "./comment";
import { onReview } from "./review";

async function main(): Promise<void> {
  const ctx: EnvContext = defaultContext;

  // Build the configuration dynamically by scanning `.github/codex/labels`.
  const GITHUB_WORKSPACE = ctx.get("GITHUB_WORKSPACE");
  const config: Config = loadConfig(GITHUB_WORKSPACE);

  // Optionally perform additional validation of prompt template files.
  performAdditionalValidation(config, GITHUB_WORKSPACE);

  const GITHUB_EVENT_NAME = ctx.get("GITHUB_EVENT_NAME");
  const GITHUB_EVENT_ACTION = ctx.get("GITHUB_EVENT_ACTION");

  // Set user.name and user.email to a bot before Codex runs, just in case it
  // creates a commit.
  setGitHubActionsUser();

  switch (GITHUB_EVENT_NAME) {
    case "workflow_dispatch": {
      // 手動実行: 入力された prompt をそのまま Codex に渡す。
      const manualPrompt = ctx.tryGetNonEmpty("INPUT_PROMPT");
      if (!manualPrompt) {
        console.warn(
          "No INPUT_PROMPT provided for workflow_dispatch event: skipping Codex run.",
        );
        return;
      }
      const lastMessage = await runCodex(manualPrompt, ctx);
      // 単純に標準出力へ結果を出す (コメント投稿対象が無いので)。
      console.log("===== Codex Output (last message) =====\n" + lastMessage);
      return;
    }
    case "issues": {
      if (GITHUB_EVENT_ACTION === "labeled") {
        await onLabeled(config, ctx);
        return;
      } else if (GITHUB_EVENT_ACTION === "opened") {
        await onComment(ctx);
        return;
      }
      break;
    }
    case "issue_comment": {
      if (GITHUB_EVENT_ACTION === "created") {
        await onComment(ctx);
        return;
      }
      break;
    }
    case "pull_request": {
      if (GITHUB_EVENT_ACTION === "labeled") {
        await ensureBaseAndHeadCommitsForPRAreAvailable(ctx);
        await onLabeled(config, ctx);
        return;
      }
      break;
    }
    case "pull_request_review": {
      await ensureBaseAndHeadCommitsForPRAreAvailable(ctx);
      if (GITHUB_EVENT_ACTION === "submitted") {
        await onReview(ctx);
        return;
      }
      break;
    }
    case "pull_request_review_comment": {
      await ensureBaseAndHeadCommitsForPRAreAvailable(ctx);
      if (GITHUB_EVENT_ACTION === "created") {
        await onComment(ctx);
        return;
      }
      break;
    }
  }

  console.warn(
    `Unsupported action '${GITHUB_EVENT_ACTION}' for event '${GITHUB_EVENT_NAME}'.`,
  );
}

main();
