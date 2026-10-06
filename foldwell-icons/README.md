# Foldwell app icons (Pocket note)

## What each file is for

| File | Where it goes |
|---|---|
| `ios/icon-1024.png` | iPhone app icon and App Store. Square, no rounded corners, no transparency (Apple rounds it for you). |
| `android/adaptive-foreground.png` | Android icon artwork. Sits on top of a solid background color. Art stays inside the safe zone so no phone crops it. |
| `android/adaptive-monochrome.png` | Android 13+ "themed icons," where the phone recolors every icon to match the wallpaper. |
| `android/play-store-512.png` | The icon you upload in Google Play Console. |
| `web/favicon.ico`, `favicon-32.png`, `favicon-16.png` | The tiny icon in the browser tab for foldwellnotes.com. |
| `web/apple-touch-icon-180.png` | Shown when someone saves foldwellnotes.com to their iPhone home screen. |
| `source/*.svg` | Master drawings. Keep these: they can be exported at any size later. |

## Expo setup (for Claude Code)

Copy the `ios` and `android` files into your project's `assets/` folder, then in `app.json`:

```json
"icon": "./assets/icon-1024.png",
"android": {
  "adaptiveIcon": {
    "foregroundImage": "./assets/adaptive-foreground.png",
    "monochromeImage": "./assets/adaptive-monochrome.png",
    "backgroundColor": "#F2F5F1"
  }
}
```

Icons only update in a new build (development build or EAS build), not by reloading in Expo Go.
