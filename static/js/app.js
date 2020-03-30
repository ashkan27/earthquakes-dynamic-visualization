//     // Initialize a new plugin instance for all
//     // e.g. $('input[type="range"]') elements.
//     $('input[type="range"]').rangeslider();

//     // Destroy all plugin instances created from the
//     // e.g. $('input[type="range"]') elements.
//     $('input[type="range"]').rangeslider('destroy');

//     // Update all rangeslider instances for all
//     // e.g. $('input[type="range"]') elements.
//     // Usefull if you changed some attributes e.g. `min` or `max` etc.
//     $('input[type="range"]').rangeslider('update', true);

//     $('input[type="range"]').rangeslider({

//       // Feature detection the default is `true`.
//       // Set this to `false` if you want to use
//       // the polyfill also in Browsers which support
//       // the native <input type="range"> element.
//       polyfill: true,

//       // Default CSS classes
//       rangeClass: 'rangeslider',
//       disabledClass: 'rangeslider--disabled',
//       horizontalClass: 'rangeslider--horizontal',
//       verticalClass: 'rangeslider--vertical',
//       fillClass: 'rangeslider__fill',
//       handleClass: 'rangeslider__handle',

//       // Callback function
//       onInit: function () { },

//       // Callback function
//       onSlide: function (position, value) {
//         console.log(value);
//       },

//       // Callback function
//       onSlideEnd: function (position, value) { }
//     });



//     $('input[type="range"]').rangeslider({
// 	polyfill: false,
// });




var output = $('.range-slider .output');
var range = $('.range-slider input[type="range"]');

// output.text(parseFloat(range.val()).toFixed(0));

// function adjusStep ()

if (+range.val() > 5 && +range.attr("step") === 3) {
    range.attr("step", "5");
    range.attr("min", "5.000");
    range.rangeslider('update', true);
} else if (+range.val() === 5 && +range.attr("step") === 5) {
    range.attr("step", "3");
    range.attr("min", "2.000");
    range.rangeslider('update', true);
}

range.on('input', function () {
    output.text(parseFloat(range.val()).toFixed(0));
    // console.log("Current step: " + +range.attr("step"));
    // console.log("Current value: " + +range.val());

    if (+range.val() > 5 && +range.attr("step") === 3) {
        range.attr("step", "5");
        range.attr("min", "5.000");
        range.rangeslider('update', true);
    } else if (+range.val() <= 5 && +range.attr("step") === 5) {
        range.attr("step", "3");
        range.attr("min", "2.000");
        range.rangeslider('update', true);
    }
});




