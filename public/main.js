var $banner = $('.temp');
        var $zip = $('input[name=\'zip\']');

        $('form').on('submit', ( event ) => {

          event.preventDefault();

          var zipCode = $.trim($zip.val());
          $banner.text('Loading.......');

          var request = $.ajax({
              url: `/${zipCode}`,
              dataType: 'json'
          });

          request.done( ( data ) => {
              $banner.html(`It is ${ data.temperature }°, in ${ zipCode }.`);
              $zip.val('');
          });
          request.fail( () => {
              $banner.text('Error!.');
          });
        });