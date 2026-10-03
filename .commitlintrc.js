// Conventional Commits; the scope is optional.
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Org convention is sentence-case subjects, and automation (Terraform
    // sync, Dependabot auto-merge) writes them into main, so don't enforce case.
    "subject-case": [0],
  },
};
