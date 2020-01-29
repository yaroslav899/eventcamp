$(document).ready(function() {	
	$("#contactForm input").on("keyup", function() {
		$(this).removeClass('is-invalid');
	});
	
	$("#contactForm textarea").on("keyup", function() {
		$(this).removeClass('is-invalid');
	});
	
	$("#contactForm button").on("click", function(e) {	
		e.preventDefault();
		const $firstname = $("#firstname");
		if (!$firstname.val().length) {
			$firstname.addClass('is-invalid');
			return false;
		}
		const $email = $("#email");
		if (!$email.val().length) {
			$email.addClass('is-invalid');
			return false;
		}
		const $textDescription = $("#textDescription");	
		if (!$textDescription.val().length) {
			$textDescription.addClass('is-invalid');
			return false;
		}

		$.ajax({
			url:     '/mail.php', 
			type:     "POST",
			dataType: "html",
			data: $("#contactForm").serialize(),
			success: function(response) {
				$("#contactForm button").replaceWith(response);
			},
			error: function(response) {
				console.log(response);
			}
		});
	});		
});