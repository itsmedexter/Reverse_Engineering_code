// Get references to page elements
// variable link to specific id on html page
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// this makes an ajax request, saves the new POST example to the url and saves the data to json 
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  // Get examples, makes an ajax request to GET examples located at "api/examples"
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  // makes an ajax request to delete examples with id
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    // calls the getExample function
    var $examples = data.map(function(example) {
      // variable makes a new array from data
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);
        // jquery script that takes an anchor tag and changes the href in example directory with and id of example

      var $li = $("<li>")// jquery script that changes the list item sets the class attribues of the example id 
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);// appends to the end of $a

        // adds bootstrap class of type, color and placed where and class of delete with text 
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);// jquery script that appends button to list item

      return $li; // returns new variable of $li
    });

    $exampleList.empty(); // Empty function for id of #example-list
    $exampleList.append($examples); // adds $examples to end of $exampleList
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();// envoking preventDefault

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()// changes the value of $exampleDescription and trims white space
  };

  // If example.text and example.description are false, an alert is returned
  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples(); // example is saved then refreshExamples function is envoked
  });

  $exampleText.val(""); // sets value of "" to $exampleText
  $exampleDescription.val(""); // sets value of "" to $exampleDescription
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();// example is deleted then refreshExamples function is envoked
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit); 
$exampleList.on("click", ".delete", handleDeleteBtnClick);
