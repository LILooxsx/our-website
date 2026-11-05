// بيانات تجريبية للفعاليات؛ يمكن استبدالها ببيانات الفعاليات الحقيقية للفريق.
const events = [
  {
    id: 1,
    title: "ورشة أساسيات تطوير الويب",
    date: "2026-11-05",
    time: "11:00 صباحاً",
    location: "دمشق",
    category: "تعليم",
    description: "ورشة تفاعلية للتعرّف إلى HTML وCSS وأساسيات بناء صفحات الويب.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 2,
    title: "معرض الفنون الطلابية",
    date: "2026-11-09",
    time: "04:00 مساءً",
    location: "حلب",
    category: "ثقافة",
    description: "مساحة لعرض إبداعات الطلبة في الرسم والتصوير والأعمال الفنية.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 3,
    title: "اليوم الرياضي الجامعي",
    date: "2026-11-14",
    time: "10:00 صباحاً",
    location: "حمص",
    category: "رياضة",
    description: "أنشطة ومسابقات رياضية تشجّع على التعاون والحركة والروح الجامعية.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 4,
    title: "ندوة مستقبل الذكاء الاصطناعي",
    date: "2026-10-25",
    time: "06:00 مساءً",
    location: "دمشق",
    category: "تعليم",
    description: "ندوة تعريفية تناقش مستقبل الذكاء الاصطناعي وتطبيقاته وأثره في التعليم والعمل والحياة اليومية.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 5,
    title: "يوم العائلة والأنشطة المفتوحة",
    date: "2026-11-22",
    time: "12:00 ظهراً",
    location: "حلب",
    category: "عائلي",
    description: "فعاليات ترفيهية وأنشطة متنوعة مناسبة للطلاب وأفراد عائلاتهم.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=500&q=80"
    ]
  },
  {
    id: 6,
    title: "ندوة الأمن السيبراني",
    date: "2026-11-27",
    time: "01:00 ظهراً",
    location: "حمص",
    category: "تعليم",
    description: "ندوة تعريفية حول حماية البيانات وأهم ممارسات السلامة الرقمية.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    extraImages: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80"
    ]
  }
];

window.eventsData = events;

const eventsContainer = document.getElementById("eventsContainer");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const dateFilter = document.getElementById("dateFilter");
const searchButton = document.getElementById("searchButton");
const resetFilters = document.getElementById("resetFilters");


// تنسيق التاريخ لعرضه باللغة العربية.
function formatDate(dateString) {
  return new Intl.DateTimeFormat("ar", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${dateString}T00:00:00`));
}

// إنشاء بطاقة HTML لكل فعالية.
function createEventCard(event) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="event-card">
        <img class="event-image"
             src="${event.image}"
             alt="الصورة الرئيسية لفعالية ${event.title}"
             loading="lazy">
        <div class="event-extra-gallery" aria-label="صورتان إضافيتان عن ${event.title}">
          ${event.extraImages.map((image, index) => `
            <img src="${image}" alt="${index === 0 ? 'صورة إضافية' : 'صورة أخرى'} توضح أجواء ${event.title}" loading="lazy">
          `).join("")}
        </div>
        <div class="event-card-body">
          <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
            <span class="badge category-badge">${event.category}</span>
            <span class="small text-muted">${formatDate(event.date)}</span>
          </div>
          <h3 class="event-title">${event.title}</h3>
          <div class="event-meta mb-2">
            <span>📍 ${event.location}</span>
            <span>🕒 ${event.time}</span>
          </div>
          <div class="event-detail-note">
            <strong>نبذة عن الفعالية:</strong> ${event.description}
            <div class="mt-2"><strong>المكان:</strong> ${event.location}</div>
            <div><strong>التاريخ:</strong> ${formatDate(event.date)}</div>
          </div>
          <a class="btn btn-primary w-100"
             href="event.html?id=${event.id}"
             aria-label="عرض تفاصيل ${event.title}">التفاصيل</a>
        </div>
      </article>
    </div>`;
}

if (eventsContainer) {
// تطبيق البحث والفلترة معاً على قائمة الفعاليات.
function filterEvents() {
  const searchText = searchInput.value.trim().toLocaleLowerCase("ar");
  const selectedCategory = categoryFilter.value;
  const selectedLocation = locationFilter.value;
  const selectedDate = dateFilter.value;

  const filteredEvents = events.filter((event) => {
    const searchableText =
      `${event.title} ${event.description} ${event.category} ${event.location}`
        .toLocaleLowerCase("ar");

    const matchesSearch = searchableText.includes(searchText);
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    const matchesLocation = !selectedLocation || event.location === selectedLocation;
    const matchesDate = !selectedDate || event.date === selectedDate;

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  eventsContainer.innerHTML = filteredEvents.map(createEventCard).join("");
  resultsCount.textContent = `عدد الفعاليات: ${filteredEvents.length}`;
  noResults.classList.toggle("d-none", filteredEvents.length !== 0);
}

// ربط عناصر الفلترة بأحداث التغيير والكتابة.
[searchInput, categoryFilter, locationFilter, dateFilter].forEach((element) => {
  element.addEventListener(element.tagName === "INPUT" && element.type === "search" ? "input" : "change", filterEvents);
});
searchButton.addEventListener("click", filterEvents);

// إعادة جميع الحقول إلى قيمتها الافتراضية.
resetFilters.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "";
  locationFilter.value = "";
  dateFilter.value = "";
  filterEvents();
});

// عرض جميع الفعاليات عند فتح الصفحة.
filterEvents();

}
