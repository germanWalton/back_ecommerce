const socket = io();
console.log(socket);

socket.on("Products", (data) => {
  const productsList = document.querySelector("#productsList");
  let templateHandlebars;
  fetch("/static/templates/products.hbs")
    .then((resp) => resp.text())
    .then((templateHbs) => {
      //compila la plantilla
      const template = Handlebars.compile(templateHbs);
      //html con la plantilla compilada
      templateHandlebars = template({ data });
    })
    .finally(() => {
      productsList.innerHTML = templateHandlebars;
    })
    .catch((e) => {
      console.log(e);
    });
});

socket.on("Messages", (data) => {
  const chat = document.querySelector("#chat");
  let templateHandlebars;
  fetch("/static/templates/chats.hbs")
    .then((resp) => resp.text())
    .then((templateHbs) => {
      //compila la plantilla
      const template = Handlebars.compile(templateHbs);
      //html con la plantilla compilada
      templateHandlebars = template({ data });
    })
    .finally(() => {
      chat.innerHTML = templateHandlebars;
    })
    .catch((e) => {
      console.log(e);
    });
});

const sendProduct = document.querySelector("#sendProduct");
sendProduct.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const thumbnail = document.querySelector("#thumbnail").value;

  const product = {
    title: title,
    price: price,
    thumbnail: thumbnail,
  };
  if (title && price) {
    socket.emit("save", product);
    document.querySelector("#title").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnail").value = "";
  }
});

const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  const emailValidator = (email) => {
    if (
      /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(
        email
      )
    ) {
      return email;
    } else {
      return null;
    }
  };

  const msg = {
    email: email,
    message: message,
  };

  if (emailValidator(email)!=null && message.length >= 3) {
    socket.emit("Msg", msg);
    document.querySelector("#email").value = "";
    document.querySelector("#message").value = "";
  }
});
