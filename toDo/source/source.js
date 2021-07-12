const content = document.getElementsByClassName("content")[0];
const btn_add = document.getElementById("btn-add");
const input_add = document.getElementById("input-add");
const btn_search = document.getElementById("btn-search");
const btn_close_search = document.getElementById("btn-close-search");
const search_container = document.getElementsByClassName("search-container")[0];
const input_search = document.getElementById("input-search");
// for fixing bug
input_add.oninput = function() {
    let thisValue = input_add.value;
    thisValue = thisValue.replace(" ", " ");
    input_add.value = thisValue;
}
input_add.onkeypress = (e) => {
    if (e.key == "Enter" || e.keyCode == 13) {
        startAdd()
    }
}

function getCurrentTasks() {
    content.innerHTML = "";
    let currentTasks = localStorage.getItem("savedTasks");
    if (currentTasks) {
        let values = currentTasks.split(",");
        let valuseLength = values.length;
        for (let i = 0; i < valuseLength; i++) {
            if (values[i] != "" && values[i] != " (done)") {
                content.innerHTML += newElement(values[i]);
            }
        }
        setDoneProperty()
    }
}
getCurrentTasks()

btn_add.addEventListener("click", startAdd);

function startAdd() {
    const inputVal = input_add.value;
    if (inputVal && inputVal.length <= 30) {
        addNew(inputVal);
    } else {
        echoError("Please write a task");
    }
}

function newElement(task) {
    let element =
        '<div class="task-container shadow" data-task-name=' + task + '>\
    <div class="task-name-container">\
        <span class="task-name">' + task + '</span>\
    </div>\
    <div class="task-buttons-container">\
        <button class="btn btn-success button btn-done">\
            <img src="icons/check.svg" class="icon" alt="ERR">\
        </button>\
        <button class="btn btn-danger button btn-delete">\
            <img src="icons/delete.svg" class="icon" alt="ERR">\
        </button>\
    </div>\
</div>';

    return element;
}

function addNew(task) {
    content.innerHTML += newElement(task);
    input_add.value = "";
    deleter();
    done();
    if (localStorage.getItem("savedTasks")) {
        addInStorage(true, task);
    } else {
        addInStorage(false, task);
    }
}

function addInStorage(already, task) {
    let currentValue = "";
    if (already) {
        currentValue = localStorage.getItem("savedTasks");
        localStorage.removeItem("savedTasks");
    }
    currentValue += task + ",";
    localStorage.setItem("savedTasks", currentValue);
}

function deleteInStorage(task) {
    let currentValue = localStorage.getItem("savedTasks");
    localStorage.removeItem("savedTasks");
    currentValue = currentValue.replace(task, "");
    localStorage.setItem("savedTasks", currentValue);
}

function doneInstorage(task) {
    let currentValue = localStorage.getItem("savedTasks");
    localStorage.removeItem("savedTasks");
    console.log(task)
    currentValue = currentValue.replace(task, task + " (done)");
    localStorage.setItem("savedTasks", currentValue);
    getCurrentTasks()
    deleter()
    done()
}

function deleter() {
    $(".btn-delete").click(function() {
        $(this).parent().parent().remove();
        deleteInStorage($(this).parent().parent().attr("data-task-name"));
    });
}

function done() {
    $(".btn-done").click(function() {
        doneInstorage($(this).parent().parent().attr("data-task-name"));
    });
}
deleter();
done();

function echoError(text) {
    $("#error-container").fadeIn(700);
    $("#error-text").html(text);
    $("#btn-close-alert").click(function() {
        $("#error-container").fadeOut(700);
    })
}

function setDoneProperty() {
    $(".task-name:contains('done')").parent().parent().css("background-color", "rgba(25, 135, 84, 0.8)");
    $(".task-name:contains('done')").css("color", "#fff")
}
setDoneProperty()
    // search
btn_search.addEventListener("click", function() {
    search_container.classList.remove("closeSearch");
    search_container.classList.add("openSearch");
})
btn_close_search.addEventListener("click", function() {
    search_container.classList.remove("openSearch");
    search_container.classList.add("closeSearch");
})
input_search.addEventListener("input", function() {
    let searchValue = input_search.value;
    searchValue = searchValue.replace(" ", " ");
    input_search.value = searchValue;
    if (searchValue) {
        $(".task-container").css("display", "none");
        $(".task-name:contains(" + searchValue + ")").parent().parent().css("display", "flex")
    } else {
        $(".task-container").css("display", "flex");
    }
})