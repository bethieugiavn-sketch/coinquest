# Tích Lộc Android — build trên GitHub

Thêm `android-app/`, `.github/workflows/build-apk.yml` và `.gitignore` vào gốc repository `coinquest`. File `index.html` ở gốc vẫn phục vụ website GitHub Pages hiện tại.

## Lấy APK

GitHub → Actions → Build Tích Lộc APK → Run workflow (hoặc push thay đổi android-app lên main). Khi lần chạy xanh, vào Artifacts → Tích Lộc-Android-debug → tải ZIP, giải nén và lấy app-debug.apk. Bản debug dùng để cài thử; không phải bản phát hành Google Play. GitHub có thể yêu cầu tài khoản đăng nhập để tải artifact. Không cần cài Android Studio trên máy cá nhân.

Workflow cài Android SDK trên máy chạy tạm của GitHub và chấp nhận giấy phép SDK bằng android-actions/setup-android. Chỉ chạy workflow khi bạn đồng ý với điều khoản Android SDK: https://developer.android.com/studio/terms .

## Lưu dữ liệu

Android dùng @capacitor/preferences (SharedPreferences), ghi xong mới cộng tiền vào giao diện. XP/Level được tính lại từ lịch sử đã lưu để tránh sai lệch. Tải lại app vẫn giữ nhiệm vụ đang chờ. Các thao tác ghi được tuần tự hóa để tránh bấm xác nhận hai lần.

Preferences tránh việc dữ liệu WebView bị dọn như cache. Gỡ ứng dụng hoặc chọn Xóa dữ liệu ứng dụng vẫn có thể xóa dữ liệu; tiếp tục sao lưu JSON. Dữ liệu không được mã hóa bằng plugin này. Trình duyệt vẫn dùng localStorage thông qua bản web của Preferences. Dữ liệu của website không tự chuyển sang APK: xuất JSON ở website và nhập trong app.

## Phản hồi rung

Quay số gọi Haptics.impact(Light); lên cấp gọi Haptics.notification(Success). Thiết bị không hỗ trợ rung vẫn dùng ứng dụng bình thường. Haptics không bảo đảm việc được Google Play duyệt.

## Build

Node 22+, npm. `cd android-app`, `npm ci`, `npm test`, `npm run build`. CSS Tailwind và confetti được đóng gói nội bộ; tải VietQR cần mạng. Thư mục android được tạo từ Capacitor đã khóa phiên bản trong mỗi lần CI. Muốn phát hành chính thức cần applicationId của bạn, khóa ký phát hành riêng, versionCode tăng dần và AAB; không đưa keystore hoặc mật khẩu lên GitHub.

## Bản Tích Lộc
Tên hiển thị mới, applicationId và khóa dữ liệu cũ giữ nguyên. Bật VietQR mặc định tắt, kể cả khi nhập bản sao cũ chưa có lựa chọn này. Chơi và nhận XP không cần tài khoản ngân hàng. Gỡ app/xóa dữ liệu vẫn mất dữ liệu. Các APK debug build ở runner khác có thể ký bằng khóa khác, vì vậy hãy sao lưu JSON trước khi cài lại. APK debug chỉ dùng thử riêng, chưa phát hành Google Play.

Quyền nền tảng chỉ gồm INTERNET và VIBRATE. CI kiểm tra manifest sau khi hợp nhất thư viện. Không có quyền SMS, danh bạ, Trợ năng hay thông báo; chưa triển khai lời nhắc.


## Linh thú 3D và hành trình dài hạn
Cảnh 3D được dựng trực tiếp bằng Three.js, đóng gói cùng APK và có hình 2D dự phòng. Có 24 hình thái ở các mốc cấp 1–700, 6 vùng đất và bậc Tinh tú mỗi 100 cấp sau cấp 700. Không đặt trần Level. Xem trước bộ sưu tập không sửa lịch sử, tiền hay XP. Cảnh dừng vẽ khi ngoài màn hình hoặc app ở nền; tôn trọng thiết lập giảm chuyển động.
Bản web một file được tạo bằng node_modules/vite/bin/vite.js build --config vite.world.config.js rồi nhúng world-dist/world.js vào HTML. Bản Android chỉ cần npm run build như workflow hiện tại.

