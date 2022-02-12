import React, { useEffect, useState } from "react";
import styles from "./Forms.module.css";

export const Form = () => {
	const [data, setData] = useState({});
	const [product, setProduct] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);

	// console.log(data);
	const handleData = (e) => {
		const { name, value, type, checked } = e.currentTarget;
		let update = type === "checkbox" ? checked : value;
		setData({
			...data,
			[name]: update,
		});
	};
	const handleSortAsc = () => {
		// console.log("before", product);
		product.sort((a, b) => {
			return a.salary - b.salary;
		});
		// console.log(product);
		setProduct([...product]);
	};
	const handleSortDes = () => {
		product.sort((a, b) => {
			return b.salary - a.salary;
		});
		// console.log(product);
		setProduct([...product]);
	}
	const handleDep1 = () => {
		const update1 = [];
		// console.log("before",product);
		product.forEach(function (item1) {
			// console.log(item.department);
			if (item1.department === "dep 1") {
				update1.push(item1);
			}
		});
		// console.log("update",update);
		setProduct([...update1])
	};
	const handleDep2 = () => {
		const update2 = [];
		// console.log("before", product);
		product.forEach(function (item2) {
			// console.log(item.department);
			if (item2.department === "dep 2") {
				update2.push(item2);
			}
		});
		console.log("update2", update2);
		setProduct([...update2]);
	};
	const handleDep3 = () => {
		const update3 = [];
		// console.log("before", product);
		product.forEach(function (item3) {
			// console.log(item.department);
			if (item3.department === "dep 3") {
				update3.push(item3);
			}
		});
		// console.log("update", update);
		setProduct([...update3]);
	};
	const handleDelete = (e) => {
		var id = e.target.previousElementSibling.innerHTML;
		console.log(id);
		fetch(`http://localhost:8000/posts/${id}`, {
			method: "DELETE",
			headers: { "Content-type": "application/json; charset=UTF-8" },
		})
			.then((response) => response.json())
			.then((json) => display())
			.catch((err) => console.log(err));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(data);
		let payload = {
			username: data.username,
			age: data.age,
			department: data.department,
			salary: data.salary,
			isMarried: data.isMarried,
		};

		fetch("http://localhost:8000/posts", {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
		})
			.then((response) => {
				// console.log('response', response);
				return response.json();
			})
			.then((forJson) => {
				// console.log("forJson", forJson);
				//console.log(product);
				display();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		display();
	}, [pageNumber]);

	const handleAll = () => {
		display();
	};
	function display() {
		fetch(`http://localhost:8000/posts?_page=${pageNumber}&_limit=5`, {
			method: "GET",
			headers: {
				"content-type": "application/json; charset=utf-8",
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((forJson) => {
				// console.log("forJson1", forJson);
				// appendProduct(forJson);
				setProduct(forJson);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.forForm}>
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={data.username}
						onChange={handleData}
					/>
				</div>
				<div>
					<label>Age</label>
					<input
						type="number"
						name="age"
						value={data.age}
						onChange={handleData}
					/>
				</div>
				<div>
					<label>Department</label>
					<select name="department" onChange={handleData}>
						<option value="">--</option>
						<option value="dep 1">Department 1</option>
						<option value="dep 2">Department 2</option>
						<option value="dep 3">Department 3</option>
					</select>
				</div>
				<div>
					<label>Salary</label>
					<input
						type="number"
						name="salary"
						value={data.salary}
						onChange={handleData}
					/>
				</div>

				<div>
					<label>isMarried</label>
					<input
						type="checkbox"
						name="isMarried"
						checked={data.isMarried}
						onChange={handleData}
					/>
				</div>
				<div>
					<button>submit</button>
				</div>
			</form>
			<button className={styles.btn} onClick={handleSortAsc}>
				Sort Ascending Order
			</button>
			<button className={styles.btn} onClick={handleSortDes}>
				Sort Descending Order
			</button>
			<button className={styles.btn} onClick={handleDep1}>
				Dislay Department 1
			</button>
			<button className={styles.btn} onClick={handleDep2}>
				Dislay Department 2
			</button>
			<button className={styles.btn} onClick={handleDep3}>
				Dislay Department 3
			</button>

			<button className={styles.btn} onClick={handleAll}>
				Display all products
			</button>

			<div>
				<div>
					<div className={styles.flex}>
						<div>USERNAME</div>
						<div>AGE</div>
						<div>SALARY</div>
						<div>DEPARTMENT</div>
						<div>IS MARRIED</div>
						<div>ID</div>
						<div>DELETE</div>
					</div>
					{product.map((elem) => (
						<div key={elem.id} className={styles.flex}>
							<div>{elem.username}</div>
							<div>{elem.age}</div>
							<div>₹ {elem.salary}</div>
							<div>{elem.department}</div>
							<div>{elem.isMarried ? "Yes" : "No"}</div>
							<div>{elem.id}</div>

							<button onClick={handleDelete}>Delete</button>
						</div>
					))}
				</div>
			</div>

			<button
				className={styles.btn}
				onClick={() => {
					if (pageNumber > 1) {
						setPageNumber(pageNumber - 1);
					}
				}}
			>
				prev
			</button>

			<button
				className={styles.btn}
				onClick={() => {
					setPageNumber(pageNumber + 1);
				}}
			>
				Next
			</button>
		</div>
	);
};
