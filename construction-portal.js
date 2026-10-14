/* ==========================================================
   NEXUSVILLE CONSTRUCTION PORTAL
   Digital marketplace interface
   Currency: South African Rand (ZAR)

   This file displays products from products.js.
   It does not process payments or grant paid downloads.
========================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", initPortal);

  function initPortal() {
    const grid = document.getElementById("nv-product-grid");
    const searchInput = document.getElementById("nv-product-search");
    const categoryFilter = document.getElementById("nv-category-filter");

    // Exit safely if the marketplace section is not on this page.
    if (!grid || !searchInput || !categoryFilter) {
      return;
    }

    const products = Array.isArray(window.NV_PRODUCTS)
      ? window.NV_PRODUCTS
      : [];

    const categories = Array.isArray(window.NV_CATEGORIES)
      ? window.NV_CATEGORIES
      : [];

    // Format prices as South African Rand.
    function formatPrice(price) {
      const amount = Number(price);

      if (!Number.isFinite(amount) || amount < 0) {
        return "Price unavailable";
      }

      return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    }

    // Safely encode text before inserting it into HTML.
    function escapeHTML(value) {
      return String(value == null ? "" : value).replace(
        /[&<>"']/g,
        function (character) {
          const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          };

          return entities[character];
        }
      );
    }

    // Populate the category selector.
    function populateCategories() {
      const uniqueCategories = [
        ...new Set(
          categories
            .filter(function (category) {
              return typeof category === "string";
            })
            .map(function (category) {
              return category.trim();
            })
            .filter(Boolean)
        )
      ];

      categoryFilter.replaceChildren();

      const allOption = document.createElement("option");
      allOption.value = "all";
      allOption.textContent = "All categories";
      categoryFilter.appendChild(allOption);

      uniqueCategories.forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }

    // Show an accessible message when no products match.
    function showMessage(message) {
      grid.replaceChildren();

      const paragraph = document.createElement("p");
      paragraph.className = "nv-marketplace-empty";
      paragraph.textContent = message;

      grid.appendChild(paragraph);
    }

    // Render the product catalogue.
    function renderProducts() {
      const query = searchInput.value.trim().toLowerCase();
      const selectedCategory = categoryFilter.value;

      const filteredProducts = products.filter(function (product) {
        if (!product || typeof product !== "object") {
          return false;
        }

        const searchableText = [
          product.name,
          product.desc,
          product.cat,
          product.format,
          ...(Array.isArray(product.includes) ? product.includes : [])
        ]
          .map(function (value) {
            return String(value == null ? "" : value);
          })
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchableText.includes(query);

        const matchesCategory =
          selectedCategory === "all" ||
          product.cat === selectedCategory;

        return matchesSearch && matchesCategory;
      });

      grid.replaceChildren();

      if (filteredProducts.length === 0) {
        showMessage(
          products.length === 0
            ? "Our digital catalogue is being prepared. Please check back soon."
            : "No resources match your search. Try another keyword or category."
        );

        return;
      }

      filteredProducts.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "nv-product-card";

        const category = document.createElement("div");
        category.className = "nv-product-category";
        category.textContent = product.cat || "Digital Resource";

        const title = document.createElement("h3");
        title.textContent = product.name || "Untitled Product";

        const description = document.createElement("p");
        description.textContent =
          product.desc || "Product details will be provided soon.";

        const format = document.createElement("span");
        format.className = "nv-product-format";
        format.textContent = product.format || "Digital Product";

        const price = document.createElement("div");
        price.className = "nv-product-price";
        price.textContent = formatPrice(product.price);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "nv-product-button";
        button.textContent = "View Purchase Options";

        // Payments remain unavailable until the backend is configured.
        button.addEventListener("click", function () {
          showProductDetails(product);
        });

        card.append(
          category,
          title,
          description,
          format,
          price,
          button
        );

        grid.appendChild(card);
      });
    }

    // Display details in a dialog without requiring another page.
    function showProductDetails(product) {
      const existingDialog = document.getElementById("nv-product-dialog");

      if (existingDialog) {
        existingDialog.remove();
      }

      const dialog = document.createElement("dialog");
      dialog.id = "nv-product-dialog";
      dialog.className = "nv-product-dialog";

      const content = document.createElement("div");
      content.className = "nv-product-dialog-content";

      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "nv-dialog-close";
      closeButton.textContent = "Close";
      closeButton.setAttribute("aria-label", "Close product details");

      closeButton.addEventListener("click", function () {
        dialog.close();
      });

      const category = document.createElement("p");
      category.className = "nv-product-category";
      category.textContent = product.cat || "Digital Resource";

      const title = document.createElement("h2");
      title.textContent = product.name || "Product Details";

      const description = document.createElement("p");
      description.textContent =
        product.desc || "Product details will be provided soon.";

      const format = document.createElement("p");
      format.textContent = "Format: " + (product.format || "Digital Product");

      const price = document.createElement("p");
      price.className = "nv-product-price";
      price.textContent = formatPrice(product.price);

      content.append(
        closeButton,
        category,
        title,
        description,
        format,
        price
      );

      if (Array.isArray(product.includes) && product.includes.length) {
        const includesHeading = document.createElement("h3");
        includesHeading.textContent = "What's included";

        const includesList = document.createElement("ul");

        product.includes.forEach(function (item) {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          includesList.appendChild(listItem);
        });

        content.append(includesHeading, includesList);
      }

      const notice = document.createElement("p");
      notice.className = "nv-marketplace-note";
      notice.textContent =
        "Online checkout is not available yet. " +
        "This product is displayed for preview purposes only. " +
        "No payment will be taken and no download is being sold through this page yet.";

      content.appendChild(notice);
      dialog.appendChild(content);
      document.body.appendChild(dialog);

      dialog.addEventListener("close", function () {
        dialog.remove();
      });

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        // Fallback for browsers without native dialog support.
        dialog.setAttribute("open", "");
      }
    }

    // Initialize the marketplace.
    populateCategories();
    renderProducts();

    searchInput.addEventListener("input", renderProducts);
    categoryFilter.addEventListener("change", renderProducts);

    console.info(
      "Nexusville Construction Portal initialized. Products:",
      products.length
    );
  }
})();
