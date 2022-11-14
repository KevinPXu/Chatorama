const deleteChatroomHandler = async (e) => {
  e.preventDefault();
  const chatid = e.target.dataset.chatid;
  
  //fetches a Delete method from the server to delete the current post
  const res = await fetch(`/api/chatroom/${chatid}`, {
    method: "DELETE",
  });

  if (res.ok) {
    document.location.reload();
  } else {
    alert("Failed to delete chatroom");
  }
};

document
  .querySelector(".delete-btn")
  .addEventListener("click", deleteChatroomHandler);
