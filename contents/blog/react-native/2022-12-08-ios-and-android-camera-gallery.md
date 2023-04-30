---
title: "React Native 웹뷰에서 갤러리, 카메라 열기"
date: "2021.11.9"
tags:
  - React
  - React Native
isPrivate: true
---

## React Native 웹뷰에서 갤러리, 카메라 열기

## 1. React Native에서 갤러리, 카메라 접근 허용

### IOS

`ios/[앱이름]/Info.plist`파일에서 보여줄 메시지 설정

- `Info.plist` 파일: 실행 패키지에 관한 필수 설정 정보가 포함된 구조화된 텍스트 파일

```md
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    // ...
    <key>NSCameraUsageDescription</key>
    <string>$(PRODUCT_NAME) would like to use your camera</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>$(PRODUCT_NAME) would like access to your photo gallery</string>
    // ...
  </dict>
</plist>
```

- NSPhotoLibraryUsageDescription: 갤러리에서 이미지나 동영상 선택해야 하는 경우 추가
- NSCameraUsageDescription: 카메라로 사진 촬영이 필요한 경우 추가
- NSMicrophoneUsageDescription: 카메라로 동영상 촬영도 필요한 경우 추가

### Android

`AndroidManifest.xml` 파일에 앱이 올바르게 작동하기 위해 사용자가 반드시 부여해야 하는 시스템 권한 명시

- `AndroidManifest.xml` 파일: 앱에 대한 필수 적인 정보를 안드로이드 툴과, OS, Google Play 스토어에 제공

```

```

## 2. RN 프로젝트에 react-native-image-picker 패키지 설치

https://github.com/react-native-image-picker/react-native-image-picker

### Refs

- https://blog.logrocket.com/react-native-permissions/
- [uses-permission-element](https://developer.android.com/guide/topics/manifest/uses-permission-element)
