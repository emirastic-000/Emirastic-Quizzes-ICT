# 🧪 German Language Mode - Testing Guide

## Quick Test (2 minutes)

### Test 1: Language Toggle Works
```
1. Run: npm start
2. Navigate to http://localhost:3000
3. Look for language button in navbar
4. Click button
5. Verify text changes instantly
6. Click again
7. Verify text changes back
```

**Expected Results:**
- ✅ Button shows `🇩🇪 Deutsch` in English mode
- ✅ Button shows `🇬🇧 English` in German mode
- ✅ All navbar text updates
- ✅ All page text updates (Login/Register)

### Test 2: Language Persistence
```
1. Switch to German (🇩🇪 Deutsch)
2. Reload the page (F5)
3. Check if still in German
4. Switch back to English (🇬🇧 English)
5. Close browser completely
6. Reopen and visit app
```

**Expected Results:**
- ✅ After reload: Still German
- ✅ After restart: Still English
- ✅ localStorage shows 'language' key with value 'de' or 'en'

## Component Testing (5 minutes each)

### Login Page
**English Mode:**
- [ ] Title shows "Login"
- [ ] Email label shows "Email"
- [ ] Password label shows "Password"
- [ ] Button shows "Login"
- [ ] Error message in English (if error)
- [ ] Success message in English (if success)

**German Mode:**
- [ ] Title shows "Anmelden"
- [ ] Email label shows "E-Mail"
- [ ] Password label shows "Passwort"
- [ ] Button shows "Anmelden"
- [ ] Error message in German
- [ ] Success message in German

### Register Page
**English Mode:**
- [ ] Title shows "Registration"
- [ ] First Name label shows "First Name"
- [ ] Last Name label shows "Last Name"
- [ ] Email label shows "Email"
- [ ] Password labels show "Password"
- [ ] Button shows "Register"

**German Mode:**
- [ ] Title shows "Registrierung"
- [ ] First Name label shows "Vorname"
- [ ] Last Name label shows "Nachname"
- [ ] Email label shows "E-Mail"
- [ ] Password labels show "Passwort"
- [ ] Button shows "Registrieren"

### Navbar
**English Mode:**
- [ ] App name: "Module 437 Quiz"
- [ ] Tagline: "ICT EFZ - Working in Support"
- [ ] Build Quiz button (if admin)
- [ ] Admin Panel button (if admin)
- [ ] Logout button

**German Mode:**
- [ ] App name: "Modul 437 Quiz"
- [ ] Tagline: "ICT EFZ - Im Support arbeiten"
- [ ] Build Quiz button (if admin)
- [ ] Admin Panel button (if admin)
- [ ] Logout button

## Integration Testing (5 minutes)

### Full User Flow - English
```
1. Load app (default English)
2. Register new account
3. All form labels in English
4. Login with new account
5. See dashboard in English
6. Verify all navbar text in English
```

### Full User Flow - German
```
1. From dashboard, click language button
2. Switch to German (🇩🇪 Deutsch)
3. Verify navbar updates to German
4. Navigate to another page
5. Verify everything in German
6. Reload page
7. Verify still in German
```

### Language Switch During Session
```
1. Login in English
2. Navigate to dashboard
3. Click language button → German
4. Verify instant update
5. No page reload needed
6. Click language button → English
7. Verify instant switch back
```

## Browser DevTools Testing

### Check localStorage
```
1. Open DevTools (F12)
2. Go to Application → LocalStorage
3. Find your localhost entry
4. Look for 'language' key
5. Value should be 'en' or 'de'
```

**Expected Results:**
- ✅ 'language' key exists after first language switch
- ✅ Value changes when switching languages
- ✅ Value persists after page reload

### Check HTML Attribute
```
1. Open DevTools
2. Inspect the <html> element
3. Look for lang attribute
```

**Expected Results:**
- ✅ In English: `<html lang="en">`
- ✅ In German: `<html lang="de">`
- ✅ Updates when language switches

### Check Console
```
1. Open DevTools Console
2. Run: localStorage.getItem('language')
3. Change language and check again
```

**Expected Results:**
- ✅ Shows 'en' or 'de'
- ✅ No errors in console
- ✅ No warnings about missing translations

## Mobile Testing

### Test on Mobile Device
```
1. Run npm start on computer
2. Find your computer's IP
3. On mobile, visit: http://<your-ip>:3000
4. Tap language button
5. Verify responsive design
6. Verify text updates
```

**Expected Results:**
- ✅ Language button visible and tappable
- ✅ No text overflow
- ✅ Layout adapts to mobile
- ✅ Language switch works on mobile

## Accessibility Testing

### Check Language Attribute
```
1. Inspect HTML element
2. Verify lang="en" or lang="de"
3. This helps screen readers
```

**Expected Results:**
- ✅ HTML lang attribute set correctly
- ✅ Updates when language changes
- ✅ Screen readers can detect language

## Performance Testing

### Check File Size
```
JavaScript impact:
  - translations.js: ~10KB
  - LanguageContext.js: ~2KB
  - Total: ~12KB (gzipped ~3KB)
```

### Check Load Time
```
1. Open DevTools Network tab
2. Reload page
3. Check total size and load time
4. Should be negligible impact
```

**Expected Results:**
- ✅ No significant load time increase
- ✅ Language switch happens instantly (<10ms)
- ✅ No lag when toggling language

## Extended Testing (Full Components)

### Dashboard (when updated)
- [ ] All labels translate
- [ ] All buttons translate
- [ ] Quiz cards show translated text
- [ ] Statistics labels translate

### Quiz Page (when updated)
- [ ] Questions display correctly
- [ ] Timer text translates
- [ ] Button text translates
- [ ] Progress indicator translates

### Results Page (when updated)
- [ ] Score labels translate
- [ ] Pass/fail message translates
- [ ] Explanation section translates
- [ ] Action buttons translate

### Quiz Builder (when updated, admin only)
- [ ] All form labels translate
- [ ] Tab names translate
- [ ] Button text translates
- [ ] Error messages translate

### Admin Panel (when updated, admin only)
- [ ] All section titles translate
- [ ] Table headers translate
- [ ] Button labels translate
- [ ] Statistics labels translate

## Error Scenario Testing

### Missing Translation Key
```
If a key doesn't exist in translations.js:
1. The key name will show instead (fallback)
2. No crash or error
3. Console will show the key
```

**Expected Result:**
- ✅ App doesn't crash
- ✅ Shows key name as fallback
- ✅ Easy to identify missing translations

### localStorage Disabled
```
If browser doesn't allow localStorage:
1. Language still switches
2. Preference won't persist
3. Defaults to English on reload
```

**Expected Result:**
- ✅ App still works
- ✅ Language switch works for current session
- ✅ No errors in console

## Automated Test Ideas

### Unit Tests
```javascript
// Test translation keys exist
test('all translation keys accessible', () => {
  const { t } = useLanguage();
  expect(t('navbar.appName')).toBeDefined();
});

// Test language switching
test('toggleLanguage switches language', () => {
  const { language, toggleLanguage } = useLanguage();
  expect(language).toBe('en');
  toggleLanguage();
  expect(language).toBe('de');
});
```

### Integration Tests
```javascript
// Test localStorage persistence
test('language persists in localStorage', () => {
  // Toggle language
  // Check localStorage
  // Reload component
  // Verify language is same
});
```

## Sign-Off Checklist

- [ ] Language button visible in navbar
- [ ] Toggle switches language instantly
- [ ] All navbar text translates correctly
- [ ] Login page fully translates
- [ ] Register page fully translates
- [ ] Language preference persists
- [ ] No console errors
- [ ] Works on mobile
- [ ] localStorage updated correctly
- [ ] HTML lang attribute updates
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Ready for production

## Known Limitations & Notes

1. **Backend Messages** - Not yet translated (error responses from API)
2. **Additional Pages** - Dashboard, Quiz, etc. awaiting component updates
3. **More Languages** - Architecture ready to add French, Spanish, etc.
4. **Email Notifications** - Not yet localized

## Test Results Template

```
Test Date: _______________
Tester: _______________
Browser: _______________
OS: _______________

✅ Tests Passed: _____
⚠️  Issues Found: _____
❌ Tests Failed: _____

Notes:
_________________________________
_________________________________
_________________________________
```

## Quick Sanity Check

Before pushing to production:

```bash
# 1. Start app
npm start

# 2. Test language toggle
# - Click button 3 times
# - Verify switches between EN and DE

# 3. Test persistence
# - Select German
# - Refresh page
# - Should still be German

# 4. Test components
# - Try Login page in both languages
# - Try Register page in both languages
# - Check navbar in both languages

# 5. Check console
# - No errors
# - No warnings
# - No undefined translations

# 6. Check localStorage
# - Key 'language' exists
# - Value is 'en' or 'de'

# Done! ✅
```

## Support

If tests fail:

1. **Check translations.js** - Verify key exists
2. **Check LanguageContext.js** - Verify hook setup
3. **Check component imports** - Verify useLanguage imported
4. **Check console** - Look for errors
5. **Check localStorage** - Verify language key saved
6. **Clear cache** - Ctrl+Shift+Delete browser cache
7. **Review documentation** - See LANGUAGE_LOCALIZATION_GUIDE.md

---

**Status**: Ready for comprehensive testing ✅
