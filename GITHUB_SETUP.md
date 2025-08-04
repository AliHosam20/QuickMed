# מדריך להעלאה ל-GitHub

## שלב 1: ניקוי הקבצים הגדולים

הרץ את הפקודה הבאה בטרמינל:

```bash
npm run setup
```

זה יסיר את הקבצים הגדולים ויהתחיל Git repository.

## שלב 2: יצירת Repository ב-GitHub

1. היכנס ל-GitHub (github.com)
2. לחץ על הכפתור הירוק "New" או "+"
3. בחר "New repository"
4. מלא את הפרטים:
   - **Repository name:** `QuickMed`
   - **Description:** `Medical appointment booking system`
   - בחר **Public**
   - אל תסמן "Add a README file"
5. לחץ "Create repository"

## שלב 3: חיבור ל-GitHub

הרץ את הפקודות הבאות בטרמינל (החלף YOUR_USERNAME בשם המשתמש שלך):

```bash
git remote add origin https://github.com/YOUR_USERNAME/QuickMed.git
git branch -M main
git push -u origin main
```

## שלב 4: התקנת Dependencies מחדש

```bash
npm install
```

## שלב 5: הפעלת השרת

```bash
npm start
```

## שלב 6: הפעלת Auto-Deploy (אופציונלי)

בטרמינל נפרד:

```bash
npm run auto-deploy
```

## פתרון בעיות

### אם יש שגיאה "file too large":
1. וודא שהרצת `npm run setup`
2. בדוק שהקובץ `.gitignore` קיים
3. נסה שוב

### אם יש שגיאה "authentication failed":
1. צור Personal Access Token ב-GitHub:
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token
   - בחר "repo" permissions
   - העתק את ה-token
2. השתמש ב-token כסיסמה

### אם יש שגיאה "remote already exists":
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/QuickMed.git
```

## בדיקה שהכל עובד

1. היכנס ל-GitHub repository שלך
2. וודא שכל הקבצים שם
3. הרץ `npm start` ובדוק שהשרת עובד
4. פתח `http://localhost:3000` בדפדפן 