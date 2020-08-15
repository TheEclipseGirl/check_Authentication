$(document).ready(function(){
// password_reminder for length and special-character and a number 
    $('#password_reminder').hide();
    $('#password-field').on('keyup',function(){
        $('#password_reminder').show();
        let value=$('#password-field').val();
        // if string has numbers returns ture else false
        function hasNumbers(str){
            var regex = /\d/g;
            return regex.test(str);
        }
        // if string has special characters returns ture else false
        function hasSpecialChar(str){
            return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
        }
        if(value.length>=6 && hasNumbers(value) && hasSpecialChar(value)){
            // window.alert('Now Password is correct');
            $("#password_reminder").html('Fine Password!!').css('color','yellow');
        }
        else{
            $("#password_reminder").html('Enter a combination of atleast 6 numbers,letters,and special characters.').css('color','rgb(112, 14, 14)');
          
        }
        

    });
    // Password is matched or not
    $('#password_match').hide();
    $('#verify_password').on('keyup',function(){
        $('#password_match').show();
        
        console.log($('#password-field').val()===($('#verify_password').val()));
        if($('#password-field').val()===($('#verify_password').val())){
            $("#password_match").html('Password Matched!!').css('color','yellow');
        }
        else{
            $('#password_match').html('Please enter same password').css('color','rgb(112, 14, 14)');
        }

    });
});