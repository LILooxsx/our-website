// عرض تفاصيل الفعالية التي اختارها المستخدم من صفحة الفعاليات.

// الفعالية رقم 4 (ندوة الذكاء الاصطناعي) لها صفحة تفاصيل خاصة،
// وكذلك رابط "تفاصيل الفعالية" في القائمة (بدون id) يفتح تلك الصفحة.
const startParams = new URLSearchParams(window.location.search);
if (!startParams.get("id") || startParams.get("id") === "4") {
  window.location.replace("event-ai.html");
}

const detailContainer = document.getElementById("eventDetailContent");
const params = new URLSearchParams(window.location.search);
const eventId = Number(params.get("id"));
const selectedEvent = (window.eventsData || []).find((event) => event.id === eventId);

function detailDate(dateString) {
  return new Intl.DateTimeFormat("ar", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    .format(new Date(`${dateString}T00:00:00`));
}

// فعاليات ذات صلة: من نفس التصنيف أولاً ثم بقية الفعاليات (3 كحد أقصى)
function relatedEventsHtml(current) {
  const others = (window.eventsData || []).filter((event) => event.id !== current.id);
  const sameCategory = others.filter((event) => event.category === current.category);
  const rest = others.filter((event) => event.category !== current.category);
  return sameCategory.concat(rest).slice(0, 3).map((event) => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="event-card related-card">
        <img class="event-image" src="${event.image}" alt="صورة فعالية ${event.title}" loading="lazy">
        <div class="event-card-body">
          <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
            <span class="badge category-badge">${event.category}</span>
            <span class="small text-muted">${detailDate(event.date)}</span>
          </div>
          <h3 class="event-title">${event.title}</h3>
          <a class="btn btn-outline-primary btn-sm" href="event.html?id=${event.id}">التفاصيل</a>
        </div>
      </article>
    </div>`).join("");
}

if (selectedEvent) {
  document.title = `${selectedEvent.title} | تفاصيل الفعالية`;
  detailContainer.innerHTML = `
    <article class="event-detail-card">
      <div class="event-detail-heading mb-4">
        <span class="badge category-badge mb-2">${selectedEvent.category}</span>
        <h1>${selectedEvent.title}</h1>
        <p class="text-muted mb-0">${selectedEvent.description}</p>
      </div>
      <img class="event-detail-main-image" src="${selectedEvent.image}" alt="${selectedEvent.title}" loading="lazy">
      <div class="row g-3 my-3">
        <div class="col-12 col-md-4"><div class="detail-info-box"><strong>📅 التاريخ</strong><span>${detailDate(selectedEvent.date)}</span></div></div>
        <div class="col-12 col-md-4"><div class="detail-info-box"><strong>📍 المكان</strong><span>${selectedEvent.location}</span></div></div>
        <div class="col-12 col-md-4"><div class="detail-info-box"><strong>🕒 الوقت</strong><span>${selectedEvent.time}</span></div></div>
      </div>
      <section class="mt-4"><h2 class="section-title">نبذة عن الفعالية</h2><p class="event-detail-description">${selectedEvent.description}</p></section>
      <section class="mt-4"><h2 class="section-title">صور من أجواء الفعالية</h2><div class="row g-3 event-detail-gallery">
        ${selectedEvent.extraImages.map((image, index) => `<div class="col-12 col-md-6"><img src="${image}" alt="${index === 0 ? 'الصورة الإضافية الأولى' : 'الصورة الإضافية الثانية'} لفعالية ${selectedEvent.title}" loading="lazy"></div>`).join("")}
      </div></section>
    </article>
    <section class="mt-5">
      <h2 class="section-title">فعاليات ذات صلة</h2>
      <div class="row g-4">${relatedEventsHtml(selectedEvent)}</div>
    </section>`;
} else {
  detailContainer.innerHTML = `<div class="alert alert-warning"><h1 class="h4">لم يتم العثور على الفعالية</h1><p>قد يكون الرابط غير مكتمل أو أن الفعالية غير موجودة.</p><a class="btn btn-primary" href="events.html">العودة إلى قائمة الفعاليات</a></div>`;
}
