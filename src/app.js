document.addEventListener("alpine:init", () => {
  // Navbar
  Alpine.data("navbar", () => ({
    isActiveNavbar: false,
    isActiveSearchForm: false,
    isActiveShoppingCart: false,
    toggleNavbar() {
      this.isActiveNavbar = !this.isActiveNavbar;
    },
    toggleSearchForm() {
      this.isActiveSearchForm = !this.isActiveSearchForm;
    },
    toggleShoppingCart() {
      this.isActiveShoppingCart = !this.isActiveShoppingCart;
    },
    closeAll() {
      this.isActiveNavbar = false;
      this.isActiveSearchForm = false;
      this.isActiveShoppingCart = false;
    },
  }));

  // Product Data
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Telur Asin Masir",
        img: "1.jpg",
        price: 3000,
        description:
          "Telur asin ini sungguh lezat dan menggugah selera! Teksturnya yang garing di luar namun lembut di dalam memberikan sensasi yang luar biasa. Rasa asin yang pas membuatnya cocok sebagai pelengkap nasi hangat atau camilan. Sungguh sebuah kelezatan yang tak terlupakan!",
      },
      {
        id: 2,
        name: "Telur Bebek",
        img: "2.jpg",
        price: 2500,
        description:
          "Kandungan alaminya memberikan rasa autentik yang menakjubkan. Telur bebek mentah ini adalah pilihan sempurna untuk diolah menjadi hidangan lezat atau digunakan sebagai bahan utama dalam berbagai resep kreatif. ",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    isActiveModal: false,
    modalData: {},
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada/ Cart Kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika Barang Sudah Ada, Cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // Jika Barang Berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah jumlah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // Ambil item yang mau di remove
      const cartItem = this.items.find((item) => item.id === id);

      // Jika Barang Lebih Dari 1
      if (cartItem.quantity > 1) {
        // Telusuri satu-persatu
        this.item = this.items.map((item) => {
          // Jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    // Mebuka Modal Box Pada Product
    openModal(product) {
      this.isActiveModal = true;
      this.modalData = product;
    },
  });
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6281904333707?text=" + encodeURIComponent(message));
});

// Format Pesan WA
const formatMessage = (obj) => {
  return `Data Customer
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map(
  (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
)}
TOTAL: ${rupiah(obj.total)}
TERIMA KASIH.`;
};

// Email Send Js
function sendMail() {
  let share = {
    nama: document.getElementById("nama").value,
    email_id: document.getElementById("email_id").value,
    phone_number: document.getElementById("phone_number").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_r0cflxl", "template_n1ic3wg", share).then(
    function (response) {
      alert("Email Terkirim!");
    },
    function (error) {
      alert("Gagal mengirim email: " + error);
    }
  );
}

//Konfersi ke Rupiah
window.rupiah = (number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
