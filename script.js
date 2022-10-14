const url_kanye =       "https://api.kanye.rest/";
const url_encrypt =     "https://classify-web.herokuapp.com/api/encrypt";
const url_decrypt = 	"https://classify-web.herokuapp.com/api/decrypt";

const crypto_key = "North";

const field_encrypted_data = document.getElementById("encrypted-message");
const field_decrypted_data = document.getElementById("decrypted-message");

async function encryptData(message) { //taken from the docs
	try {
		const jsonData = JSON.stringify({
			data: message, key: crypto_key
		});
		let response = await fetch(url_encrypt, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: jsonData
		});
		const result = await response.json();
		let new_text = document.createElement("p");
		new_text.textContent = result.result;
		field_encrypted_data.appendChild(new_text);
	} catch (error) {
		console.error(error);
	}
}

async function decryptData(message, guess_key) {
	try {
		const jsonData = JSON.stringify({ 
			data: message, key: guess_key
		});
		let response = await fetch(url_decrypt, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: jsonData
		});
		const result = await response.json();
		let new_text = document.createElement("p");
		new_text.textContent = result.result;
		field_decrypted_data.appendChild(new_text);
	} catch (error) {
		console.error(error);
	}
}

fetch(url_kanye)
	.then(function(response) {
		if (response.status != 200) {
			return { text: "Error getting quote" }
		}
		return response.json();
	}).then(function(json) {
		let kanye_quote = json.quote;
		encryptData(kanye_quote);
	});

function on_click(e) {
	e.preventDefault();
	let user_word = document.getElementById("secret-word").value;
	decryptData(field_encrypted_data.textContent, user_word);
}

document.getElementById("submit").addEventListener("click", on_click);

