# Pre-Push Security Checklist

Run this checklist before pushing code to ensure no sensitive information is committed.

## 🔍 Manual Checks

- [ ] No `.env` files committed (check with `git status`)
- [ ] No hardcoded passwords in source code
- [ ] No API keys or tokens in code
- [ ] No database credentials in code
- [ ] No personal information exposed
- [ ] `.env.example` files only contain placeholders
- [ ] All secrets use environment variables

## 🔎 Automated Checks

Run these commands before pushing:

### 1. Check for .env files
```bash
git ls-files | grep -E "\.env$"
```
**Expected output**: Nothing (empty)

### 2. Search for potential secrets
```bash
git diff --cached | grep -iE "(password|secret|key|token|credential).*=.*['\"]"
```
**Review carefully**: Ensure no actual secrets are being committed

### 3. Check for common sensitive patterns
```bash
git diff --cached | grep -iE "(api_key|access_token|private_key|auth_token)"
```

### 4. Run npm audit
```bash
cd backend && npm audit
cd ../frontend && npm audit
```

## 📋 Common Mistakes to Avoid

❌ **DO NOT commit**:
- `.env` files
- `config/secrets.js` or similar
- Files with actual passwords/keys
- Database dumps with user data
- `.pem`, `.key`, `.cert` files

✅ **DO commit**:
- `.env.example` (with placeholders only)
- Configuration templates
- Documentation about required secrets

## 🔒 If You Accidentally Committed Secrets

1. **DO NOT** just delete the file and commit again (it's still in history)
2. **Immediately** rotate/change the exposed credentials
3. Remove from git history:
   ```bash
   # Remove file from history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/secret/file" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (use with caution)
   git push origin --force --all
   ```
4. Notify the team
5. Update documentation

## 💡 Best Practices

1. **Use environment variables** for all sensitive configuration
2. **Review diffs** before committing: `git diff --cached`
3. **Use `.gitignore`** properly
4. **Enable pre-commit hooks** to prevent accidents
5. **Never commit real credentials** even temporarily

## 🛡️ Setting Up Pre-Commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh

# Check for .env files
if git diff --cached --name-only | grep -qE "\.env$"; then
    echo "❌ Error: Attempting to commit .env file!"
    echo "Please remove .env files from your commit."
    exit 1
fi

# Check for potential secrets
if git diff --cached | grep -qiE "(password|secret|key|token).*=.*['\"][^'\"{]*['\"]"; then
    echo "⚠️  Warning: Potential secret detected in commit!"
    echo "Please review your changes carefully."
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## 📚 Additional Resources

- [SECURITY.md](../SECURITY.md) - Security policy
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git-secrets tool](https://github.com/awslabs/git-secrets)

---

**Remember**: Once something is pushed to a public repository, assume it's compromised forever. Prevention is key!
