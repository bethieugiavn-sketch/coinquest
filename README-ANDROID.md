# CoinQuest Android — build trên GitHub

Thêm `android-app/`, `.github/workflows/build-apk.yml` và `.gitignore` vào gốc repository `coinquest`. File `index.html` ở gốc vẫn phục vụ website GitHub Pages hiện tại.

## Lấy APK

GitHub → Actions → Build CoinQuest APK → Run workflow (hoặc push thay đổi android-app lên main). Khi lần chạy xanh, vào Artifacts → CoinQuest-Android-debug → tải ZIP, giải nén và lấy app-debug.apk. Bản debug dùng để cài thử; không phải bản phát hành Google Play. GitHub có thể yêu cầu tài khoản đăng nhập để tải artifact. Không cần cài Android Studio trên máy cá nhân.

Workflow cài Android SDK trên máy chạy tạm của GitHub và chấp nhận giấy phép SDK bằng android-actions/setup-android. Chỉ chạy workflow khi bạn đồng ý với điều khoản Android SDK: https://developer.android.com/studio/terms .

## Lưu dữ liệu

Android dùng @capacitor/preferences (SharedPreferences), ghi xong mới cộng tiền vào giao diện. XP/Level được tính lại từ lịch sử đã lưu để tránh sai lệch. Tải lại app vẫn giữ nhiệm vụ đang chờ. Các thao tác ghi được tuần tự hóa để tránh bấm xác nhận hai lần.

Preferences tránh việc dữ liệu WebView bị dọn như cache. Gỡ ứng dụng hoặc chọn Xóa dữ liệu ứng dụng vẫn có thể xóa dữ liệu; tiếp tục sao lưu JSON. Dữ liệu không được mã hóa bằng plugin này. Trình duyệt vẫn dùng localStorage thông qua bản web của Preferences. Dữ liệu của website không tự chuyển sang APK: xuất JSON ở website và nhập trong app.

## Phản hồi rung

Quay số gọi Haptics.impact(Light); lên cấp gọi Haptics.notification(Success). Thiết bị không hỗ trợ rung vẫn dùng ứng dụng bình thường. Haptics không bảo đảm việc được Google Play duyệt.

## Build

Node 22+, npm. `cd android-app`, `npm ci`, `npm test`, `npm run build`. CSS Tailwind và confetti được đóng gói nội bộ; tải VietQR cần mạng. Thư mục android được tạo từ Capacitor đã khóa phiên bản trong mỗi lần CI. Muốn phát hành chính thức cần applicationId của bạn, khóa ký phát hành riêng, versionCode tăng dần và AAB; không đưa keystore hoặc mật khẩu lên GitHub.
