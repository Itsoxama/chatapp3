import helpers from './helpers.js';

window.addEventListener( 'load', () => {
  



    //When the 'Create room" is button is clicked
    document.getElementById( 'create-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let roomName = document.querySelector( '#room-name' ).value;
        let yourName = document.querySelector( '#your-name' ).value;

        if ( roomName && yourName ) {
            //remove error message, if any
            document.querySelector('#err-msg').innerText = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem( 'username', yourName );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomName.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;

            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `Room successfully created. Click <a href='${ roomLink }'>here</a> to enter room. 
                Share the room link with your partners.`;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector('#err-msg').innerText = "All fields are required";
        }
    } );


    //When the 'endmeet' button is clicked.
    document.getElementById( 'addmeeting' ).addEventListener( 'click', ( e ) => {
var a=window.location.href.split('_')

        var da={
            message:"video call ended",
            _id:a[1]
      
          }
          console.log(da)

var ai=0;
  const repeat = () => {

    setTimeout(() => {


      if (ai === 2) return
      else if (ai === 0) {

        var url = 'https://server.quickdex.net/api/updatedeskmsg2';
          
        fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(da)
        }).then(res => {
          console.log("Request complete! response:", res);
        });


      }
      else if (ai === 1) {

window.location.href="https://chatapp.quickdex.net/"
      }
      ai = ai + 1
      repeat();
    }, 500);
  }

  repeat()






    } );
    
    //When the 'endmeet' button is clicked.
    document.getElementById( 'addmeeting2' ).addEventListener( 'click', ( e ) => {
     
        
        var ai=0;
          const repeat = () => {
        
            setTimeout(() => {
        
        
              if (ai === 2) return
              else if (ai === 0) {
        
        
                window.location.href="https://chatapp.quickdex.net/"
        
              }
              else if (ai === 1) {
        
              }
              ai = ai + 1
              repeat();
            }, 500);
          }
        
          repeat()
        
        
        
        
        
        
            } );
    //When the 'Enter room' button is clicked.
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        let name = "asdsad"

        if ( name ) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerText = "";

        }

        else {
            document.querySelector('#err-msg-username').innerText = "Please input your name";
        }
    } );


    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );


} );
