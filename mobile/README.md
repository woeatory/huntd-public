<h1 align="center">
  <a href="https://huntd.tech/">
    Huntd Mobile
  </a>
</h1>

Huntd is a mobile client based on React Native framework.

## 📋 Requiremenets

Mobile application targets to iOS and Android platforms. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.

**iOS requirements**: `macOS, NodeJS, Watchman, Xcode, Xcode CLI, Cocoapods, iOS Simulator`

**Android requirements**: `macOS / Windows / Linux, NodeJS, Watchman, Java SDK, Android Studio, Android SDK, Android AVD`

## 📖 Setup environment

1. Do [Mate developer setup guide](https://docs.google.com/document/d/1-Tc4rOG7tHXgwWoF1eihtFyE9PY28tYLO7yDgfqpvGs/edit#) before the start.
2. Be sure you've already installed [Homebrew](https://brew.sh/) on your operating system.
3. Do **iOS** steps from the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup)
4. Do **Android** steps from the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup)

## 🚀 Run project

Start the Metro server in `huntd/mobile`:
```bash
npm start
```

### iOS

Run application:
```bash
npm run ios:dev
```

### Android

Run application on **Android** emulator:
```bash
npm run android:dev
```

## 📄 Deployment

#### Platforms
1. [AppStore Connect](https://appstoreconnect.apple.com/)
2. [Google Play Console](https://play.google.com/console/)

To realese application we use [Fastlane](https://fastlane.tools/).

Configuration files: `mobile/ios/fastlane/Fastfile` and `mobile/android/fastlane/Fastfile`.

#### iOS example:
```ruby
default_platform(:ios)

platform :ios do
  lane :beta do
    increment_build_number(xcodeproj: "Huntd.xcodeproj")
    build_app(workspace: "Huntd.xcworkspace", scheme: "Huntd")
    upload_to_testflight
  end
end
```

To start iOS deployment to TestFlight:
```bash
  cd ios
  fastlane beta
```
