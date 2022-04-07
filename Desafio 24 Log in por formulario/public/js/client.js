const socket = io();
console.log(socket);

socket.on("Products", (data) => {
  const productsList = document.querySelector("#productsList");
  let templateHandlebars;
  console.log(data)
  fetch("/static/render/products.hbs")
    .then((resp) => resp.text())
    .then((templateHbs) => {
      console.log(templateHbs)
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
  console.log(data)
  const author = new normalizr.schema.Entity("authors", {}, { idAttribute: "email" });
  const message = new normalizr.schema.Entity("messages", {
    author:author
  })
  const schemaMessage = new normalizr.schema.Entity("data", {
    messages:[message]
  })
  const denormalizeData = normalizr.denormalize("messages", schemaMessage, data.entities)
  const denormalizedData = denormalizeData.messages
  const denormalizeDataLength = JSON.stringify(data).length
  const normalizedDataLength = JSON.stringify(denormalizeData).length
  const compressionPercentage = Math.floor((normalizedDataLength * 100) / denormalizeDataLength)
  fetch("/static/render/chats.hbs")
    .then((resp) => resp.text())
    .then((templateHbs) => {
      //compila la plantilla
      const template = Handlebars.compile(templateHbs);
      //html con la plantilla compilada
      templateHandlebars = template({ denormalizedData,compressionPercentage });
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
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const thumbnail = document.querySelector("#thumbnail").value;

  const product = {
    name: name,
    price: price,
    thumbnail: thumbnail,
  };
  if (name && price) {
    socket.emit("save", product);
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnail").value = "";
  }
});

const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const name = document.querySelector("#authorName").value;
  const lastName = document.querySelector("#lastName").value;
  const age = document.querySelector("#age").value;
  const alias = document.querySelector("#alias").value;
  const avatar = document.querySelector("#avatar").value;
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
    author: {
      email:email,
      name: name,
      lastName: lastName,
      age: age,
      alias: alias,
      avatar:avatar
    },
    text:message
  }

  if (emailValidator(email) != null && message.length >= 3) {
    
    socket.emit("Msg", msg);
   document.querySelector("#email").value = "";
   document.querySelector("#message").value = "";
   document.querySelector("#authorName").value = "";
   document.querySelector("#lastName").value = "";
   document.querySelector("#age").value = "";
   document.querySelector("#alias").value = "";
   document.querySelector("#avatar").value = "";
  }
});


// data.forEach(prd => {
//   productsElement.innerHTML += `
//   <div class="uk-card uk-card-default uk-card-body uk-width-1-1 uk-margin-top">
//     <div class="uk-card-badge uk-label">${prd.price}</div>
//     <h3 class="uk-card-title">${prd.name}</h3>
//     <p>${prd.description}</p>
//   </div>`
// })
