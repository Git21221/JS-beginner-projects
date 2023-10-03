function addNote() 
{
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    
    if (title.trim().length === 0 || content.trim().length === 0) 
    {
        alert("Please fill in both title and content fields.");
        return;
    }

    const noteList = document.getElementById("noteList");

    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const noteTitle = document.createElement("h2");
    noteTitle.textContent = title;

    const noteContent = document.createElement("p");
    noteContent.textContent = content;

    const noteActions = document.createElement("div");
    noteActions.className = "note-actions";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() 
    {
        noteList.removeChild(noteDiv);
    };

    noteActions.appendChild(deleteButton);
    noteDiv.appendChild(noteTitle);
    noteDiv.appendChild(noteContent);
    noteDiv.appendChild(noteActions);

    noteList.appendChild(noteDiv);

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
}