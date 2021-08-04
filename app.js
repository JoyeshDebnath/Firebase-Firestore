const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

//creating element and rendering the info from firestore database
function renderCafe(doc) {
	let li = document.createElement("li");
	let name = document.createElement("span");
	let city = document.createElement("span");
	let cross = document.createElement("div");
	li.setAttribute("data-id", doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = "🗑️";
	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);
	cafeList.appendChild(li);

	//Delete a info from firestore database
	cross.addEventListener("click", (e) => {
		let id = e.target.parentElement.getAttribute("data-id");
		db.collection("Cafes").doc(id).delete();
	});
}

//getting data from firestore database
db.collection("Cafes")
	.get()
	.then((snapshot) => {
		// console.log(snapshot.docs);
		snapshot.docs.forEach((doc) => {
			renderCafe(doc);
		});
	});

//setting data

form.addEventListener("submit", (e) => {
	e.preventDefault();
	db.collection("Cafes").add({
		name: form.name.value,
		city: form.city.value,
	});
	form.name.value = "";
	form.city.value = "";
});
