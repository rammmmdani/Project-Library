const STORAGE_KEY = "perpusAlRabbaniBooks";

const defaultBooks = [
  {
    id: "buku-1",
    isbn: "978-602-8519-93-9",
    judul: "Dasar Pemrograman Web",
    penulis: "Andi Pratama",
    tahun: 2022,
    status: "Tersedia",
    halaman: 210,
    penerbit: "Pustaka Digital",
    bahasa: "Indonesia",
    lokasiRak: "Rak A-03",
    rating: 4.8,
    sinopsis:
      "Buku ini membahas dasar-dasar pembuatan website mulai dari struktur HTML, penggunaan CSS, sampai pengenalan JavaScript. Materi disusun sederhana agar mudah dipahami oleh pembaca yang baru belajar pemrograman web.",
    ulasan:
      "Buku ini mudah dipahami dan cocok untuk pemula yang ingin belajar membuat website.",
    peminjam: [
      "Rina Amelia - 12 April 2026",
      "Fajar Nugroho - 25 Maret 2026",
      "Maya Sari - 10 Maret 2026",
    ],
  },
  {
    id: "buku-2",
    isbn: "978-623-7131-44-2",
    judul: "Algoritma dan Struktur Data",
    penulis: "Siti Rahma",
    tahun: 2021,
    status: "Dipinjam",
    halaman: 245,
    penerbit: "Informatika Nusantara",
    bahasa: "Indonesia",
    lokasiRak: "Rak B-02",
    rating: 4.6,
    sinopsis:
      "Buku ini menjelaskan konsep algoritma, array, stack, queue, linked list, tree, dan graph dengan contoh sederhana yang mudah dipraktikkan.",
    ulasan:
      "Materinya runtut dan membantu pembaca memahami logika pemrograman secara bertahap.",
    peminjam: ["Dian Putri - 20 April 2026", "Arif Maulana - 2 April 2026"],
  },
  {
    id: "buku-3",
    isbn: "978-602-0328-71-3",
    judul: "Basis Data untuk Pemula",
    penulis: "Budi Santoso",
    tahun: 2023,
    status: "Tersedia",
    halaman: 198,
    penerbit: "Data Media",
    bahasa: "Indonesia",
    lokasiRak: "Rak C-01",
    rating: 4.7,
    sinopsis:
      "Pembahasan dasar basis data relasional, perancangan tabel, relasi, normalisasi, dan pengenalan query SQL untuk pemula.",
    ulasan:
      "Penjelasan contoh tabel dan query sangat membantu untuk latihan praktikum.",
    peminjam: ["Nadia Safira - 18 Maret 2026"],
  },
  {
    id: "buku-4",
    isbn: "978-979-2916-10-9",
    judul: "Desain UI/UX Modern",
    penulis: "Dewi Lestari",
    tahun: 2020,
    status: "Dipinjam",
    halaman: 176,
    penerbit: "Kreatif Studio Press",
    bahasa: "Indonesia",
    lokasiRak: "Rak D-04",
    rating: 4.5,
    sinopsis:
      "Buku ini membahas prinsip desain antarmuka, pengalaman pengguna, wireframe, prototyping, dan evaluasi tampilan aplikasi modern.",
    ulasan:
      "Cocok untuk pembaca yang ingin memahami proses desain produk digital dari awal.",
    peminjam: ["Bagas Prakoso - 21 April 2026", "Salsa Nuraini - 5 April 2026"],
  },
];

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function getBooks() {
  const storedBooks = localStorage.getItem(STORAGE_KEY);

  if (!storedBooks) {
    saveBooks(defaultBooks);
    return [...defaultBooks];
  }

  try {
    const parsedBooks = JSON.parse(storedBooks);
    return Array.isArray(parsedBooks) ? parsedBooks : [...defaultBooks];
  } catch (error) {
    console.error("Data LocalStorage tidak valid:", error);
    saveBooks(defaultBooks);
    return [...defaultBooks];
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatStatus(status) {
  const className = status === "Tersedia" ? "tersedia" : "dipinjam";
  return `<span class="status ${className}">${escapeHtml(status)}</span>`;
}

function todayIndonesian() {
  return new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateId() {
  return `buku-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getBookFromForm() {
  return {
    id: document.getElementById("bookId").value || generateId(),
    isbn: document.getElementById("isbn").value.trim(),
    judul: document.getElementById("judul").value.trim(),
    penulis: document.getElementById("penulis").value.trim(),
    tahun: Number(document.getElementById("tahun").value),
    status: document.getElementById("status").value,
    halaman: Number(document.getElementById("halaman").value),
    penerbit: document.getElementById("penerbit").value.trim(),
    bahasa: document.getElementById("bahasa").value.trim(),
    lokasiRak: document.getElementById("lokasiRak").value.trim(),
    rating: Number(document.getElementById("rating").value),
    sinopsis: document.getElementById("sinopsis").value.trim(),
    ulasan: document.getElementById("ulasan").value.trim(),
    peminjam: [],
  };
}

function fillForm(book) {
  document.getElementById("bookId").value = book.id;
  document.getElementById("isbn").value = book.isbn;
  document.getElementById("judul").value = book.judul;
  document.getElementById("penulis").value = book.penulis;
  document.getElementById("tahun").value = book.tahun;
  document.getElementById("status").value = book.status;
  document.getElementById("halaman").value = book.halaman;
  document.getElementById("penerbit").value = book.penerbit;
  document.getElementById("bahasa").value = book.bahasa;
  document.getElementById("lokasiRak").value = book.lokasiRak;
  document.getElementById("rating").value = book.rating;
  document.getElementById("sinopsis").value = book.sinopsis;
  document.getElementById("ulasan").value = book.ulasan;

  document.getElementById("formTitle").textContent = "Edit Data Buku";
  document.getElementById("submitBtn").textContent = "Update Buku";
  document.getElementById("cancelEditBtn").classList.remove("hidden");
  document.getElementById("form-buku").scrollIntoView({ behavior: "smooth" });
}

function resetFormMode() {
  const form = document.getElementById("bookForm");
  form.reset();
  document.getElementById("bookId").value = "";
  document.getElementById("formTitle").textContent = "Tambah Buku Baru";
  document.getElementById("submitBtn").textContent = "Simpan Buku";
  document.getElementById("cancelEditBtn").classList.add("hidden");
}

function getFilteredBooks() {
  const books = getBooks();
  const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  const statusFilter = document.getElementById("filterStatus").value;

  return books.filter((book) => {
    const searchableText = `${book.isbn} ${book.judul} ${book.penulis} ${book.tahun} ${book.status}`.toLowerCase();
    const matchKeyword = searchableText.includes(keyword);
    const matchStatus = statusFilter === "semua" || book.status === statusFilter;
    return matchKeyword && matchStatus;
  });
}

function renderStats(books) {
  const totalTersedia = books.filter((book) => book.status === "Tersedia").length;
  const totalDipinjam = books.filter((book) => book.status === "Dipinjam").length;

  document.getElementById("totalBuku").textContent = books.length;
  document.getElementById("totalTersedia").textContent = totalTersedia;
  document.getElementById("totalDipinjam").textContent = totalDipinjam;
}

function renderBooks() {
  const books = getBooks();
  const filteredBooks = getFilteredBooks();
  const tableBody = document.getElementById("bookTableBody");
  const emptyState = document.getElementById("emptyState");

  renderStats(books);

  if (filteredBooks.length === 0) {
    tableBody.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  tableBody.innerHTML = filteredBooks
    .map(
      (book, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeHtml(book.isbn)}</td>
          <td>${escapeHtml(book.judul)}</td>
          <td>${escapeHtml(book.penulis)}</td>
          <td>${escapeHtml(book.tahun)}</td>
          <td>${formatStatus(book.status)}</td>
          <td>
            <div class="action-buttons">
              <a href="detail.html?id=${encodeURIComponent(book.id)}" class="detail">Lihat</a>
              <button type="button" class="btn small" data-action="edit" data-id="${escapeHtml(book.id)}">Edit</button>
              <button type="button" class="btn small danger" data-action="delete" data-id="${escapeHtml(book.id)}">Hapus</button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const books = getBooks();
  const formBook = getBookFromForm();
  const editedBookId = document.getElementById("bookId").value;
  const isbnAlreadyUsed = books.some(
    (book) => book.isbn === formBook.isbn && book.id !== editedBookId,
  );

  if (isbnAlreadyUsed) {
    alert("ISBN sudah digunakan oleh buku lain.");
    return;
  }

  if (editedBookId) {
    const updatedBooks = books.map((book) =>
      book.id === editedBookId
        ? { ...formBook, peminjam: Array.isArray(book.peminjam) ? book.peminjam : [] }
        : book,
    );
    saveBooks(updatedBooks);
    alert("Data buku berhasil diperbarui.");
  } else {
    saveBooks([...books, formBook]);
    alert("Data buku berhasil ditambahkan.");
  }

  resetFormMode();
  renderBooks();
}

function handleTableClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  const books = getBooks();
  const selectedBook = books.find((book) => book.id === id);

  if (!selectedBook) {
    alert("Data buku tidak ditemukan.");
    return;
  }

  if (action === "edit") {
    fillForm(selectedBook);
    return;
  }

  if (action === "delete") {
    const confirmed = confirm(`Hapus buku "${selectedBook.judul}"?`);
    if (!confirmed) return;

    saveBooks(books.filter((book) => book.id !== id));
    renderBooks();
    resetFormMode();
    alert("Data buku berhasil dihapus.");
  }
}

function resetDefaultData() {
  const confirmed = confirm("Reset semua data dan kembalikan data contoh?");
  if (!confirmed) return;

  saveBooks(defaultBooks);
  resetFormMode();
  renderBooks();
  alert("Data contoh berhasil dikembalikan.");
}

function initIndexPage() {
  const bookForm = document.getElementById("bookForm");
  if (!bookForm) return;

  bookForm.addEventListener("submit", handleFormSubmit);
  document.getElementById("bookTableBody").addEventListener("click", handleTableClick);
  document.getElementById("searchInput").addEventListener("input", renderBooks);
  document.getElementById("filterStatus").addEventListener("change", renderBooks);
  document.getElementById("cancelEditBtn").addEventListener("click", resetFormMode);
  document.getElementById("clearFormBtn").addEventListener("click", () => {
    setTimeout(resetFormMode, 0);
  });
  document.getElementById("resetDataBtn").addEventListener("click", resetDefaultData);

  const editIdFromDetail = sessionStorage.getItem("editBookId");
  if (editIdFromDetail) {
    sessionStorage.removeItem("editBookId");
    const book = getBooks().find((item) => item.id === editIdFromDetail);
    if (book) {
      setTimeout(() => fillForm(book), 100);
    }
  }

  renderBooks();
}

function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderDetailPage() {
  const detailCard = document.getElementById("detailCard");
  if (!detailCard) return;

  const books = getBooks();
  const selectedId = getBookIdFromUrl();
  const book = books.find((item) => item.id === selectedId) || books[0];

  if (!book) {
    detailCard.innerHTML = `
      <a href="index.html#katalog" class="back">← Kembali</a>
      <h1>Data buku belum tersedia</h1>
      <p>Silakan tambahkan data buku terlebih dahulu melalui halaman CRUD.</p>
    `;
    return;
  }

  document.title = `${book.judul} - Perpustakaan Al-Rabbani`;
  setText("detailJudul", book.judul);
  setText("detailPenulis", book.penulis);
  setText("detailIsbn", `ISBN: ${book.isbn}`);
  setText("detailTahun", `Tahun: ${book.tahun}`);
  setText("detailStatus", `Status: ${book.status}`);
  setText("detailSinopsis", book.sinopsis);
  setText("detailHalaman", `${book.halaman} halaman`);
  setText("detailPenerbit", book.penerbit);
  setText("detailBahasa", book.bahasa);
  setText("detailLokasiRak", book.lokasiRak);
  setText("detailRating", `★★★★★ ${book.rating}/5`);
  setText("detailUlasan", book.ulasan);
  setText("sideJudul", `Judul: ${book.judul}`);
  setText("sidePenulis", `Penulis: ${book.penulis}`);
  setText("sideStatus", `Status: ${book.status}`);

  const borrowerList = document.getElementById("borrowerList");
  borrowerList.innerHTML = Array.isArray(book.peminjam) && book.peminjam.length > 0
    ? book.peminjam.map((borrower) => `<li>${escapeHtml(borrower)}</li>`).join("")
    : "<li>Belum ada data peminjam.</li>";

  const borrowBtn = document.getElementById("borrowBtn");
  borrowBtn.textContent = book.status === "Tersedia" ? "Pinjam Buku" : "Kembalikan Buku";

  borrowBtn.onclick = () => {
    const latestBooks = getBooks();
    const latestBook = latestBooks.find((item) => item.id === book.id);
    if (!latestBook) return;

    const updatedBooks = latestBooks.map((item) => {
      if (item.id !== latestBook.id) return item;

      if (latestBook.status === "Tersedia") {
        const borrowerName = prompt("Masukkan nama peminjam:", "Nama Peminjam");
        if (!borrowerName || borrowerName.trim() === "") return item;

        const borrowerRecord = `${borrowerName.trim()} - ${todayIndonesian()}`;
        return {
          ...item,
          status: "Dipinjam",
          peminjam: [borrowerRecord, ...(Array.isArray(item.peminjam) ? item.peminjam : [])].slice(0, 5),
        };
      }

      return { ...item, status: "Tersedia" };
    });

    saveBooks(updatedBooks);
    renderDetailPage();
  };

  document.getElementById("editFromDetailBtn").onclick = (event) => {
    event.preventDefault();
    sessionStorage.setItem("editBookId", book.id);
    window.location.href = "index.html#form-buku";
  };
}

initIndexPage();
renderDetailPage();
