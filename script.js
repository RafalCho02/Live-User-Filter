$(document).ready(function () {
  const result = $("#result");
  const filter = $("#filter");
  const listItems = [];

  getData();

  filter.on("input", function (e) {
    filterData(e.target.value);
  });

  async function getData() {
    const res = await fetch("https://randomuser.me/api?results=50");
    const { results } = await res.json();

    result.html("");

    results.forEach((user) => {
      const li = $("<li></li>");

      listItems.push(li);

      li.html(`
        <img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>
      `);

      result.append(li);
    });
  }

  function filterData(searchTerm) {
    listItems.forEach((item) => {
      if (item.text().toLowerCase().includes(searchTerm.toLowerCase())) {
        item.removeClass("hide");
      } else {
        item.addClass("hide");
      }
    });
  }
});
