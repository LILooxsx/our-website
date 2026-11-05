// التحقق من نموذج "اتصل بنا" بالجافاسكربت
var form = document.getElementById("contactForm");
var alertBox = document.getElementById("alertContainer");

// عرض تنبيه Bootstrap (نجاح أو خطأ)
function showAlert(text, type) {
  alertBox.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">' +
    text + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button></div>';
}

form.addEventListener("submit", function (event) {
  event.preventDefault();   // منع إرسال النموذج فعلياً
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // صيغة بريد بسيطة

  if (name === "" || email === "" || message === "") {
    showAlert("يرجى ملء جميع الحقول المطلوبة (*).", "danger");
    return;
  }
  if (!emailPattern.test(email)) {
    showAlert("صيغة البريد الإلكتروني غير صحيحة.", "danger");
    return;
  }
  showAlert("تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.", "success");
  form.reset();
});
