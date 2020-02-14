$(document).ready(function() {		
	var lastScrollPos = 1000;	// default scroll position 	
	
	//display search button and hide search box - display navbar elements
	var displaySearchButton = function(){
		if( $('#search-box').hasClass('search-box-display') ){
			// remove focus from search box input field
			//$('#search-box-input').blur();
			
			$('#search-box').addClass('search-box-hide')		// hide search box
				.removeClass('search-box-display'); 			 
			$('#search-btn-div').addClass('toggle-search')   	// display search button
				.removeClass('toggle-search-hide');						
			$('.navbar-brand-hide').addClass('navbar-brand')	// display myt logo
				.removeClass('navbar-brand-hide'); 	
			$('.navbar-header-hide').addClass('navbar-header')	// display navbar-header Menu link
				.removeClass('navbar-header-hide'); 			
		}
	};
	
	//hide search button and display search box - hide navbar elements
	var hideSearchButton = function(){
		if( $('#search-box').hasClass('search-box-hide') ){
			$('#search-box').addClass('search-box-display')		// display search box
				.removeClass('search-box-hide'); 				
			$('#search-btn-div').addClass('toggle-search-hide') // hide search button
				.removeClass('toggle-search');			
			$('.navbar-brand').addClass('navbar-brand-hide')  	// remove myt logo - to have more horizontal space
				.removeClass('navbar-brand'); 
			$('.navbar-header').addClass('navbar-header-hide')	// remove navbar-header Menu link
				.removeClass('navbar-header'); 
			
			// put focus on search box input field
			$('#search-box-input').focus();
		}
	};
	
	// function to hide/display scroll icon at bottom of page when scroll up/down
	var showNavArrow = function(){
		if ($(this).scrollTop() > 100) {	// scrolled up
			$('.scrollIcon').fadeIn();		// hide icon
		} else {
			$('.scrollIcon').fadeOut();		// show icon
		}
	};
	showNavArrow();		//run function on page load - default: dont show icon
	
	// function to hide/display/animate navbar on scroll up/down
	var navBarScroll = function(){
		var currentScrollPos = $(this).scrollTop();
		var isNavBarHasCollapsedIn = $('#myt-navbar-collapse').hasClass('in');
		
		// current scroll position must be greater than last scroll position
		// navbar must not be 'collapsed in'
		if ( (currentScrollPos > lastScrollPos) 
				&& !isNavBarHasCollapsedIn ){	
			$('nav').addClass('fall-out')		// hide navbar with animation
				.removeClass('fall-in');	
			
			// on navbar hide - change search box to search button if search box is focus
			displaySearchButton();
		}else{
			$('nav').addClass('fall-in')		// display navbar with animation
				.removeClass('fall-out');	
		}
		
		lastScrollPos = currentScrollPos;		// reset the last scroll position to current
		
	/*		console.log("currentScrollPos:" + currentScrollPos +"\n");
			console.log("lastScrollPos:" + lastScrollPos +"\n");*/
	};
	
	// fire events for scroll
	$(window).scroll(function(){
		showNavArrow();		// run function to hide/display scroll icon
		navBarScroll();		// run function to hide/display navbar
	});
	
	// smooth scroll to top of page when scroll icon link clicked
	$('.scrollIcon').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 1000); 	  //perform the smooth scroll animation
		$('nav').addClass('fall-in').removeClass('fall-out'); // display navbar with animation
		lastScrollPos = 0;									  // reset to prevent navBarScroll function from firing
		
		return false;
	});
	
	// change search-button to search-box on click - hide navbar elements
	$('.toggle-search').click(function(){
		hideSearchButton();
			
		return false;
	});
	
	//change search-box to search-button when search-box input field loses focus - display navbar elements
	$('#search-box-input').focusout(function(){
		displaySearchButton();
	});
	
	
	// accordion to display minus icon to an element that is collapsed in panel-heading
	$(".collapse.in").each(function(){
		$(this).siblings(".panel-heading").find(".fas").addClass("fa-minus")
			.removeClass("fa-plus");
	});
	
	// accordion to toggle plus/minus icon to an element that is collapsed/expanded in panel-heading
	$(".collapse").on('show.bs.collapse', function(){
		$(this).parent().find(".fas").removeClass("fa-plus").addClass("fa-minus");
	})
	.on('hide.bs.collapse', function(){
		$(this).parent().find(".fas").removeClass("fa-minus").addClass("fa-plus");
	});	
    
	
    // disable submit button on page load
	if( $('body').find("#join-form").length > 0 )
		document.getElementById("joinsubmit").disabled = true;		// Join MyT form
    
    if( $('body').find("#contact-form").length > 0 )
    	document.getElementById("contactsubmit").disabled = true;	// Contact us form
    
    if( $('body').find("#choir-form").length > 0 )
    	document.getElementById("choirsubmit").disabled = true;		// Choir form
    
    if( $('body').find("#skills-form").length > 0 )
    	document.getElementById("skillssubmit").disabled = true;	// Skills Audit form
    
    if( $('body').find("#general-form").length > 0 )
    	document.getElementById("generalsubmit").disabled = true;	// General form
    
    // enable/disable submit button on g-recaptcha successful
    function enableJoinSubmit(){	// Join MyT form
    	document.getElementById("joinsubmit").disabled = false;		
		if( $('#captcha-message-error').hasClass('captcha-block-error') ){
			$('#captcha-message-error').removeClass('captcha-block-error') 
				.addClass('captcha-block');	
		}
    } 
    window.enableJoinSubmit = enableJoinSubmit;
    
    function enableContactSubmit(){	// Contact us form
    	document.getElementById("contactsubmit").disabled = false;	
		if( $('#captcha-message-error').hasClass('captcha-block-error') ){
			$('#captcha-message-error').removeClass('captcha-block-error') 
				.addClass('captcha-block');	
		}
    }
    window.enableContactSubmit = enableContactSubmit;
    
    function enableChoirSubmit(){	// Choir form
    	document.getElementById("choirsubmit").disabled = false;	
		if( $('#captcha-message-error').hasClass('captcha-block-error') ){
			$('#captcha-message-error').removeClass('captcha-block-error') 
				.addClass('captcha-block');	
		}
    }
    window.enableChoirSubmit = enableChoirSubmit;
    
    function enableSkillsSubmit(){	// Skills Audit form
    	document.getElementById("skillssubmit").disabled = false;		
		if( $('#captcha-message-error').hasClass('captcha-block-error') ){
			$('#captcha-message-error').removeClass('captcha-block-error') 
				.addClass('captcha-block');	
		}
    } 
    window.enableSkillsSubmit = enableSkillsSubmit;
    
    function enableGeneralSubmit(){		// General form
    	document.getElementById("generalsubmit").disabled = false;	
		if( $('#captcha-message-error-gen').hasClass('captcha-block-error') ){
			$('#captcha-message-error-gen').removeClass('captcha-block-error') 
				.addClass('captcha-block');	
		}
    }
    window.enableGeneralSubmit = enableGeneralSubmit;

    // dont submit form if g-recaptcha unsuccessful
    function validateRecaptcha( formParam, formId, submitBtnId ){
	    var captchaResponse = grecaptcha.getResponse();
	    var captchaRetVal = false;
	    
	    if(captchaResponse.length == 0){			// captcha is not Passed
	    	captchaRetVal = false;					
	    	document.getElementById(submitBtnId).disabled = true;
	    	formParam.preventDefault();
			
	    	// set g-captcha errors on forms if captcha not passed/checked
			if( formId == '#contact-form' ){ 		
				$('#captcha-message-error-contact')			// create g-captcha error
					.text("Please click on 'I'm not a robot' to prove that you are human");	
				if( $('#captcha-message-error-contact').hasClass('captcha-block') ){
					$('#captcha-message-error-contact').removeClass('captcha-block') 
						.addClass('captcha-block-error');	// display g-captcha error
				}
			}else if( formId == '#join-form' ){		
				$('#captcha-message-error-join')				
					.text("Please click on 'I'm not a robot' to prove that you are human");	
				if( $('#captcha-message-error-join').hasClass('captcha-block') ){
					$('#captcha-message-error-join').removeClass('captcha-block') 
						.addClass('captcha-block-error');	
				}
			}else if( formId == '#choir-form' ){	
				$('#captcha-message-error-choir')				
					.text("Please click on 'I'm not a robot' to prove that you are human");	
				if( $('#captcha-message-error-choir').hasClass('captcha-block') ){
					$('#captcha-message-error-choir').removeClass('captcha-block') 
						.addClass('captcha-block-error');	
				}
			}else if( formId == '#skills-form' ){	
				$('#captcha-message-error-skills')				
					.text("Please click on 'I'm not a robot' to prove that you are human");
				if( $('#captcha-message-error-skills').hasClass('captcha-block') ){
					$('#captcha-message-error-skills').removeClass('captcha-block') 
						.addClass('captcha-block-error');	
				}
			}else if( formId == '#general-form' ){  
				$('#captcha-message-error-general')				
					.text("Please click on 'I'm not a robot' to prove that you are human");
				if( $('#captcha-message-error-general').hasClass('captcha-block') ){
					$('#captcha-message-error-general').removeClass('captcha-block') 
						.addClass('captcha-block-error');	
				}
			}
	    }else{										// captcha is Passed
	    	captchaRetVal = true;					
	    	document.getElementById(submitBtnId).disabled = false;
	    	
	    	// set g-captcha errors on forms if captcha is passed/checked
			if( formId == '#contact-form' ){ 		
		    	if( $('#captcha-message-error-contact').hasClass('captcha-block-error') ){
					$('#captcha-message-error-contact').removeClass('captcha-block-error') 
						.addClass('captcha-block');	
		    	}
			}else if( formId == '#join-form' ){		
		    	if( $('#captcha-message-error-join').hasClass('captcha-block-error') ){
					$('#captcha-message-error-join').removeClass('captcha-block-error') 
						.addClass('captcha-block');	
		    	}
			}else if( formId == '#choir-form' ){	
		    	if( $('#captcha-message-error-choir').hasClass('captcha-block-error') ){
					$('#captcha-message-error-choir').removeClass('captcha-block-error') 
						.addClass('captcha-block');	
		    	}
			}else if( formId == '#skills-form' ){	
		    	if( $('#captcha-message-error-skills').hasClass('captcha-block-error') ){
					$('#captcha-message-error-skills').removeClass('captcha-block-error') 
						.addClass('captcha-block');	
		    	}
			}else if( formId == '#general-form' ){  
		    	if( $('#captcha-message-error-general').hasClass('captcha-block-error') ){
					$('#captcha-message-error-general').removeClass('captcha-block-error') 
						.addClass('captcha-block');	
		    	}
			}
	    	
	    	// store session key upon submit to set success message for each form anytime during session
	    	if( formId == '#contact-form' ){		// set contact us session key	
	    		sessionStorage.setItem("formSelection", "#contact-form");
	    	}else if( formId == '#join-form' ){		// set join us session key
	    		sessionStorage.setItem("formSelection", "#join-form");	    			
	    	}else if( formId == '#choir-form' ){	// set join choir session key	
	    		sessionStorage.setItem("formSelection", "#choir-form");	
	    	}else if( formId == '#skills-form' ){	// set skills audit session key
	    		sessionStorage.setItem("formSelection", "#skills-form");
	    	}else if( formId == '#general-form' ){	// set general form session key
	    		sessionStorage.setItem("formSelection", "#general-form");
	    	}else
	    		sessionStorage.setItem("formSelection", "");

	    	//$(formId).bootstrapValidator('defaultSubmit');			
		}	
	    return captchaRetVal;
    }
    window.validateRecaptcha = validateRecaptcha;
    
    var formSuccessMsg = function(){
    	var formIdforSession = sessionStorage.getItem("formSelection");	// get submitted form from web session storage
    	
    	// set and display success message for each form anytime during session
    	if ( formIdforSession == '#contact-form' ){
    		$('#submit-confirm-msg')		
				.text("Thank you for contacting us. Your message has been received and you will be contacted once it is attended to.");
	    	if( $('#submit-confirm').hasClass('submit-confirm-hide') ){
	    		$('#submit-confirm').removeClass('submit-confirm-hide').addClass('submit-confirm-show').delay(15000).fadeOut(15000);
				sessionStorage.removeItem("formSelection");		// remove session varaible for form after displaying success message
			}
    	}else if( formIdforSession == '#join-form'  ){
    		$('#submit-confirm-msg')			
				.text("Thank you for your request to Join MyT. Your request has been received and you will be contacted once it is attended to.");	
	    	if( $('#submit-confirm').hasClass('submit-confirm-hide') ){
	    		$('#submit-confirm').removeClass('submit-confirm-hide').addClass('submit-confirm-show').delay(15000).fadeOut(15000);
				sessionStorage.removeItem("formSelection");		
			}
    	}else if( formIdforSession == '#choir-form' ){
    		$('#submit-confirm-msg')				
				.text("Thank you for your request to Join MyT Choir. Your request has been received and you will be contacted once it is attended to.");  
	    	if( $('#submit-confirm').hasClass('submit-confirm-hide') ){
	    		$('#submit-confirm').removeClass('submit-confirm-hide').addClass('submit-confirm-show').delay(15000).fadeOut(15000);
				sessionStorage.removeItem("formSelection");		
			}
    	}else if( formIdforSession == '#skills-form' ){
    		$('#submit-confirm-msg')				
				.text("Thank you for submitting your skills information. You will be contacted when opportunities that match your skills are found.");  
    	if( $('#submit-confirm').hasClass('submit-confirm-hide') ){
    		$('#submit-confirm').removeClass('submit-confirm-hide').addClass('submit-confirm-show').delay(15000).fadeOut(15000);
			sessionStorage.removeItem("formSelection");		
			}
    	}else if ( formIdforSession == '#general-form' ){
    		$('#submit-confirm-msg')		
			.text("Thank you for entering the competition. Your entry has been saved and you will be contacted if your are the winner.");
	    	if( $('#submit-confirm').hasClass('submit-confirm-hide') ){
	    		$('#submit-confirm').removeClass('submit-confirm-hide').addClass('submit-confirm-show').delay(15000).fadeOut(15000);
				sessionStorage.removeItem("formSelection");		// remove session varaible for form after displaying success message
			}
    	}
    }	// end function formSuccessMsg()
        
    // bootstrap form validator for 'Join us' form
    $('#join-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        message: 'Please type in all infortmation before submitting',
        fields: {
        	joinname: {			// validate contact name
        		container:  '#name-join-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your name must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your name'
                    }
                }
            },
            jointel: {				// validate contact phone
        		container:  '#phone-join-error',
                validators: {
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Your phone number must have 10 numbers. DO NOT use international dialing code (i.e. +27)'
                    },
	                notEmpty: {
	                    message: 'Please supply your phone number'
	                },
	                regexp: {
	                	regexp: /^[0-9]+$/,
	                    message: 'Please supply a vaild phone number with numbers only'
	                }
                }
            },            
            joinemail: {			//validate contact email
        		container:  '#email-join-error',            	
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            }
        } // end fields
    })
    .on('error.field.bv', function (e, data){
    	 if (data.bv.getSubmitButton())
    		 data.bv.disableSubmitButtons(true);
	})
	.on('success.field.bv', function(e, data){
		 if (data.bv.getSubmitButton())
			 data.bv.disableSubmitButtons(false);
	})
	.on('success.form.bv', function(e){
		validateRecaptcha( e, '#join-form', 'joinsubmit' );		 
    });
    
	// bootstrap form validator for 'Contact us' form
    $('#contact-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        message: 'Please type in all infortmation before submitting',
        fields: {
        	contactname: {			// validate contact name
        		container:  '#name-contact-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your name must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your name'
                    }
                }
            },
            contacttel: {			// validate contact phone
        		container:  '#phone-contact-error',
                validators: {
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Your phone number must have 10 numbers. DO NOT use international dialing code (i.e. +27)'
                    },
	                notEmpty: {
	                    message: 'Please supply your phone number'
	                },
	                regexp: {
	                	regexp: /^[0-9]+$/,
	                    message: 'Please supply a vaild phone number with numbers only'
	                }
                }
            },            
            contactemail: {		//validate contact email
        		container:  '#email-contact-error',            	
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            contactmessage: {		//validate contact message
        		container:  '#message-contact-error',            	
                validators: {
                    stringLength: {
                        min: 5,
                        max: 600,
                        message:'Your message must have 5 letters but no more than 600 letters'
                    },
                    notEmpty: {
                        message: 'Please supply a message for contacting us'
                    }
                }
             }
        } // end fields
    })
    .on('error.field.bv', function (e, data){
    	 if (data.bv.getSubmitButton())
    		 data.bv.disableSubmitButtons(true);
	})
	.on('success.field.bv', function(e, data){
		 if (data.bv.getSubmitButton())
			 data.bv.disableSubmitButtons(false);
	})
	.on('success.form.bv', function(e){
		validateRecaptcha( e, '#contact-form', 'contactsubmit' );
    });
    
    // bootstrap form validator for 'Choir' form
    $('#choir-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        message: 'Please type in all infortmation before submitting',
        fields: {
        	choirname: {			// validate contact name
        		container:  '#name-choir-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your name must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your name'
                    }
                }
            },
            choirtel: {			// validate contact phone
        		container:  '#phone-choir-error',
                validators: {
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Your phone number must have 10 numbers. DO NOT use international dialing code (i.e. +27)'
                    },
	                notEmpty: {
	                    message: 'Please supply your phone number'
	                },
	                regexp: {
	                	regexp: /^[0-9]+$/,
	                    message: 'Please supply a vaild phone number with numbers only'
	                }
                }
            },            
            choiremail: {		//validate contact email
        		container:  '#email-choir-error',            	
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            }
        } // end fields
    })
    .on('error.field.bv', function (e, data){
    	 if (data.bv.getSubmitButton())
    		 data.bv.disableSubmitButtons(true);
	})
	.on('success.field.bv', function(e, data){
		 if (data.bv.getSubmitButton())
			 data.bv.disableSubmitButtons(false);
	})
	.on('success.form.bv', function(e){
		validateRecaptcha( e, '#choir-form', 'choirsubmit' );			 
    });
    
	// bootstrap form validator for 'Skills Audit' form
    $('#skills-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        message: 'Please type in all infortmation before submitting',
        fields: {
        	skillsfname: {			// validate First name
        		container:  '#fname-skills-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your first name must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your First Name'
                    }
                }
            },
            skillslname: {			// validate surname
        		container:  '#lname-skills-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your surname must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your Surname'
                    }
                }
            },            
            skillstel: {			// validate phone
        		container:  '#phone-skills-error',
                validators: {
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Your phone number must have 10 numbers. DO NOT use international dialing code (i.e. +27)'
                    },
	                notEmpty: {
	                    message: 'Please supply your phone number'
	                },
	                regexp: {
	                	regexp: /^[0-9]+$/,
	                    message: 'Please supply a vaild phone number with numbers only'
	                }
                }
            },            
            skillsemail: {		//validate email
        		container:  '#email-skills-error',            	
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            skillsres: {			// validate residential location
        		container:  '#res-skills-error',
                validators: {
                    stringLength: {
                        min: 5,
                        max: 150,
                        message: 'Your residential location must have 5 letters but no more than 150 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your Residential Location'
                    }
                }
            },               
            skillsqual: {		//validate qualification input
        		container:  '#qual-skills-error',            	
                validators: {
                    stringLength: {
                        min: 2,
                        max: 600,
                        message:'Your qualifications/skills must have 2 letters but no more than 600 letters'
                    },
                    notEmpty: {
                        message: 'Please supply a qualification/skill'
                    }
                }
             }
        } // end fields
    })
    .on('error.field.bv', function (e, data){
    	 if (data.bv.getSubmitButton())
    		 data.bv.disableSubmitButtons(true);
	})
	.on('success.field.bv', function(e, data){
		 if (data.bv.getSubmitButton())
			 data.bv.disableSubmitButtons(false);
	})
	.on('success.form.bv', function(e){
		validateRecaptcha( e, '#skills-form', 'skillssubmit' );
    });
    
    $('#general-form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        message: 'Please type in all infortmation before submitting',
        fields: {
        	generalname: {			// validate contact name
        		container:  '#name-general-error',
                validators: {
                    stringLength: {
                        min: 2,
                        max: 100,
                        message: 'Your name must have 2 letters but no more than 100 letters'
                    },
                        notEmpty: {
                        message: 'Please supply your name'
                    }
                }
            },
            generaltel: {			// validate contact phone
        		container:  '#phone-general-error',
                validators: {
                    stringLength: {
                        min: 10,
                        max: 10,
                        message: 'Your phone number must have 10 numbers. DO NOT use international dialing code (i.e. +27)'
                    },
	                notEmpty: {
	                    message: 'Please supply your phone number'
	                },
	                regexp: {
	                	regexp: /^[0-9]+$/,
	                    message: 'Please supply a vaild phone number with numbers only'
	                }
                }
            },            
            generalemail: {		//validate contact email
        		container:  '#email-general-error',            	
                validators: {
                    /*notEmpty: {
                        message: 'Please supply your email address'
                    },*/
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            generalmessage: {		//validate contact message
        		container:  '#message-general-error',            	
                validators: {
                    stringLength: {
                        min: 5,
                        max: 600,
                        message:'Your chosen newsletter name must have 5 letters but no more than 600 letters'
                    },
                    notEmpty: {
                        message: 'Please supply a name for the MYT-DRC Newsletter'
                    }
                }
             }
        } // end fields
    })
    .on('error.field.bv', function (e, data){
    	 if (data.bv.getSubmitButton())
    		 data.bv.disableSubmitButtons(true);
	})
	.on('success.field.bv', function(e, data){
		 if (data.bv.getSubmitButton())
			 data.bv.disableSubmitButtons(false);
	})
	.on('success.form.bv', function(e){
		validateRecaptcha( e, '#general-form', 'generalsubmit' );
    });    
    
    formSuccessMsg();   
    
    // validate file uploads
    var isUploadValid = true;				// prevent upload for invalid files
    function validateFileUpload(fileUpload){	// check file extension and file size
    	var isRequiredExt = false;
    	var isRequiredSize = false;
    	var isUploadSuccess = false;
    	var requiredFileSize = 5242880;
    	var fileName = fileUpload.files[0].name;
        var requiredExt = new Array("pdf","doc","docx");
        var targetExt = fileName.split('.').pop().toLowerCase(); // split filename by dot(.); get file extension by pop(); return filename if no extention.

        // check if extension is required extension
        for(var i = 0; i < requiredExt.length; i++){
            if( requiredExt[i] == targetExt ){
            	isRequiredExt = true;
            }
        }
        
        // send alert if uploaded file is not required extension and prevent submit
        if(!isRequiredExt){
        	$('#file-name').html(fileUpload.files[0].name);
        	$('#upload-msg').html("Your CV is NOT a <strong>PDF</strong> or <strong>WORD</strong> file. " +
        			"<p>You can continue to <strong>Submit your details</strong> but your CV " +
        			"<strong>WILL NOT</strong> be uploaded!</p>").removeClass('upload-msg-hide').addClass('upload-msg-show');
        	
        	// remove danger alert if upload is invoked more than once
        	if( $('#upload-msg').hasClass('alert-success') ) 
        		$('#upload-msg').removeClass('alert-success').addClass('alert-danger');
        	
        }
        // check if file is required size
        if( fileUpload.files[0].size <= requiredFileSize ){
        	isRequiredSize = true;
        }
        
        if(!isRequiredSize){
        	$('#file-name').html(fileUpload.files[0].name);
        	$('#upload-msg').html("Your CV is more than 5MB in size. " +
        			"<p>You can continue to <strong>Submit your details</strong> but your CV " +
        			"<strong>WILL NOT</strong> be uploaded!</p>").removeClass('upload-msg-hide').addClass('upload-msg-show');
        	
        	// remove danger alert if upload is invoked more than once
        	if( $('#upload-msg').hasClass('alert-success') ) 
        		$('#upload-msg').removeClass('alert-success').addClass('alert-danger');      	
        }
        
        if(isRequiredExt && isRequiredSize){
        	$('#file-name').html(fileUpload.files[0].name);
        	$('#upload-msg').html("Your CV will be uploaded when you Submit!").removeClass('upload-msg-hide')
        		.addClass('upload-msg-show').removeClass('alert-danger').addClass('alert-success');
        	isUploadSuccess = true;
        }
        
        return isUploadSuccess;
    }
    window.validateFileUpload = validateFileUpload;
    
    // process social share buttons only if social share section exists on page
    if ( $('#share-button-bottombar').length ){
	    var titlePg = document.getElementById('share-title').textContent + ':';	// get title of share section to use as title of share link
		var urlPg = location.href;												// link of page
		
		// navigate to sharing site on social share button click
		// determine social site by using button <element> ID
		$('#share-buttons i').click(function(event){
			var buttonId = $(this).attr('id').split('-')[0]; // get first part of button id before the -
			switch (buttonId){								 // select social site to use from button id
				case 'facebook':
					navShare('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlPg) + '&title=' + encodeURIComponent(titlePg));
					break;
				case 'twitter':
					navShare('http://twitter.com/home?status=' + encodeURIComponent(titlePg + ' ' + urlPg));
					break;
				case 'whatsapp':
					navShare('https://wa.me/?text=' + encodeURIComponent(titlePg + ' ' + urlPg));
					break;
				case 'mail':
					navShare('mailto:?subject=' + titlePg + '&body=Found this on the URCSA Melodi ya Tshwane Website: ' + urlPg);
					break;
			}								 
		});
    } // end if ( $('#share-button-bottombar').length )
    
    // function to pop up social site window for sharing
    function navShare(navLink){
    	// pop-up dimensions
    	popHeight = 450;
    	popWidth = 650;
    	popLeft = ($(window).width() - popWidth) / 2;
    	popTop = ($(window).height() - popHeight) / 2;
    	popOptions = 'width=' + popWidth + ',heigth=' + popHeight + ',top=' + popTop + ',left=' + popLeft;
    	window.open(navLink,'Share This Link',popOptions);	// open pop to share site
    	return false;
    }
    
});
	