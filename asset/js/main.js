const name = document.querySelector("#courseName");
const Category = document.querySelector("#courseCategory");
const Price = document.querySelector("#coursePrice");
const Description = document.querySelector("#courseDescription");
const Capacity = document.querySelector("#courseCapacity");
const addbtn = document.querySelector("#click");
const deleteBtn = document.querySelector("#deleteBtn");
const errorName = document.querySelector(".name-error")
const errorcat = document.querySelector(".cat-error")
let courses = [];

if (localStorage.getItem("courses") != null) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

const namepattern = /^[A-Z][a-z]{3,20}$/;
const Categorypattern = /^[A-Z][a-z]{3,20}$/;


name.addEventListener("keyup", (e) => {
    if (!namepattern.test(name.value)) {
        errorName.classList.remove("d-none")
        errorName.innerHTML = "* This name is invalid";
        errorName.classList.add("text-danger");
        name.classList.add("border-danger");
        name.classList.remove("is-valid");
        addbtn.classList.add("disabled");
    }
    else {
        errorName.classList.add("d-none");
        name.classList.remove("border-danger");
        name.classList.add("is-valid");
    }
});
Category.addEventListener("keyup", (e) => {
    if (!Categorypattern.test(Category.value)) {
        errorcat.classList.remove("d-none")
        errorcat.innerHTML = "* This category is invalid";
        errorcat.classList.add("text-danger");
        Category.classList.add("border-danger");
        Category.classList.remove("is-valid");
        addbtn.classList.add("disabled");
    }
    else {
        addbtn.classList.remove("disabled");
        errorcat.classList.add("d-none");
        Category.classList.remove("border-danger");
        Category.classList.add("is-valid")
    }
});
if(!namepattern.test(name.value) && !Categorypattern.test(Category.value)){
    addbtn.classList.add("disabled");
}
else{
    addbtn.classList.remove("disabled");
}

addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!namepattern.test(name.value)) {
        errorName.classList.remove("d-none")
        errorName.innerHTML = "* This name is invalid";
        errorName.classList.add("text-danger");
        name.classList.add("is-invalid", "border-danger");
        name.classList.remove("is-valid");
    }
    else {

        errorName.classList.add("d-none");
        name.classList.remove("is-invalid", "border-danger");
        name.classList.add("is-valid");
        if (!Categorypattern.test(Category.value)) {
            errorcat.classList.remove("d-none")
            errorcat.innerHTML = "* This category is invalid";
            errorcat.classList.add("text-danger");
            Category.classList.add("is-invalid", "border-danger");
            Category.classList.remove("is-valid");
        }
        else {
            errorcat.classList.add("d-none");
            Category.classList.remove("is-invalid", "border-danger");
            Category.classList.add("is-valid");
            const course = {
                name: name.value,
                Category: Category.value,
                Price: Price.value,
                Description: Description.value,
                Capacity: Capacity.value
            }
            courses.push(course);
            localStorage.setItem("courses", JSON.stringify(courses));
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Added successfully!"
            });
        }
    }
    displayCourses();
});

function displayCourses() {
    const result = courses.map((course, index) => {
        return `<tr>
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.Category}</td>
                    <td>${course.Price}</td>
                    <td>${course.Description}</td>
                    <td>${course.Capacity}</td>
                    <td><a class="btn btn-outline-primary">update</a></td>
                    <td><button class="btn btn-bg-danger btn-outline-danger" onclick="deleteCourse(${index})">delete</button></td>
                </tr>`;
    }).join("");
    document.querySelector("#data").innerHTML = result;
}

function deleteCourse(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this course!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            Swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted.",
                icon: "success"
            });
        }
    });

}

deleteBtn.addEventListener("click", () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            localStorage.setItem("courses", JSON.stringify(courses));
            displayCourses();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your courses have been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your courses are safe :)",
                icon: "error"
            });
        }
    });
});