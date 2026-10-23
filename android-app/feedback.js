export const FEEDBACK_FORM='https://docs.google.com/forms/d/e/1FAIpQLSeDrJj03tXitQcqfSp-CJ-teE27FjC2D9jyWvOfnf6GF5CH-g/viewform';
export function feedbackUrl(version){const url=new URL(FEEDBACK_FORM);url.searchParams.set('usp','pp_url');url.searchParams.set('entry.1492958373','Tích Lộc '+version);return url.href}
export function initFeedback(version='1.9.0'){
 const form=document.getElementById('settingsForm');if(!form||document.getElementById('feedbackSection'))return;
 const section=document.createElement('section');section.id='feedbackSection';section.style.cssText='margin-top:24px;padding-top:20px;border-top:1px solid #455849;line-height:1.65';
 const h=document.createElement('h3');h.textContent='💬 Cùng làm Tích Lộc tốt hơn';h.className='font-bold mb-2';
 const p=document.createElement('p');p.className='muted text-sm mb-3';p.textContent='Báo lỗi, góp ý giao diện hoặc đề xuất tính năng qua Google Forms. Email liên hệ không bắt buộc. Không gửi mật khẩu, OTP hay thông tin ngân hàng.';
 const link=document.createElement('a');link.id='feedbackLink';link.href=feedbackUrl(version);link.target='_blank';link.rel='noopener noreferrer';link.className='secondary';link.style.cssText='display:inline-flex;text-decoration:none;min-height:44px;align-items:center';link.textContent='💬 Góp ý cho Tích Lộc ↗';link.setAttribute('aria-label','Góp ý cho Tích Lộc, mở Google Forms bên ngoài ứng dụng');
 const note=document.createElement('p');note.className='muted text-xs mt-3';note.textContent='Chỉ điền sẵn phiên bản '+version+'. App không đính kèm tiền, lịch sử hay số tài khoản. Nội dung bạn tự gửi được lưu trên Google Forms/Sheets để quản lý và trả lời góp ý.';
 section.append(h,p,link,note);form.append(section);
}
