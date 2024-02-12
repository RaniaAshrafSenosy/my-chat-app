(function () {
  const app = document.querySelector(".app");
  const socket = io();
  let uname;
  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      let username = app.querySelector(".join-screen #userName").value;
      if (username.length == 0) {
        return;
      }
      socket.emit("newuser", username);
      uname = username;
      app.querySelector(".join-screen").classList.remove("d-block");
      app.querySelector(".join-screen").classList.add("d-none");
      app.querySelector(".chat-screen").classList.remove("d-none");
      app.querySelector(".chat-screen").classList.add("d-block");
    });
  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message,
      });
      socket.emit("chat", {
        username: uname,
        text: message,
      });
      app.querySelector(".chat-screen #message-input").value = "";
    });
    app.querySelector(".chat-screen #exit-chat").addEventListener("click",function(){
socket.emit("exituser",uname);
window.location.href=window.location.href;
    });
    socket.on("update",function(update){
        renderMessage("update",update);
    });
    socket.on("chat",function(message){
        renderMessage("other",message);
    });
  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (type == "my") {
      let myMessg = document.createElement("div");
      myMessg.setAttribute("class", "message my-message d-flex p-2 justify-content-end");
      myMessg.innerHTML = `
         <div>
         <div class="your-name fw-bold">
         You
        </div>
        <div class="text">${message.text}</div>
         </div>
            `;
            messageContainer.appendChild(myMessg);
    } else if (type == "other") {
        let otherMessg = document.createElement("div");
        otherMessg.setAttribute("class", "message other-message d-flex justify-content-start p-2 ");
        otherMessg.innerHTML = `
             <div>
             <div class="other-name fw-bold">
             ${message.username}
            </div>
            <div class="text">${message.text}</div>
             </div>
              `;
              messageContainer.appendChild(otherMessg);
    } else if (type == "update") {
        let updateMessg = document.createElement("div");
        updateMessg.setAttribute("class", "update text-center p-2 fst-italic");
        updateMessg.innerText =message ;
        messageContainer.appendChild(updateMessg);
    }
    // messageContainer.scrollTop=messageContainer.scrollHeight-messageContainer.clientHeight;
  }
})();
