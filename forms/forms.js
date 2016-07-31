$(document).ready(function() {
    var array = [];
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      // initialize a new variable as an empty object
      var values = {};

      // convert the form inputs into an array
      var fields = $('#employeeinfo').serializeArray();

      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element, index, array) {
        // review index notation vs. dot notation on objects
        // here, dot notation wouldn't work
        values[element.name] = element.value;
      });

      console.log(values);

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');
      $('#employeeinfo').find('input[type=number]').val('');
      // append to DOM
      appendDom(values);
    });
    var total = 0;
    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();
      $el.append('<p>' + empInfo.employeefirstname + ' ' + empInfo.employeelastname + ' ' + empInfo.employeeidnum + ' ' + empInfo.employeejobtitle + ' ' + empInfo.employeesalaryyearly + '<button>Remove Worker</button>' + '</p>');
      var theValue = parseInt(($.data($('p').get(0),'EmployeeSalary', empInfo.employeesalaryyearly)));
      total += theValue;
      calculateTotal(total);
      $el.on('click', function(){
      removeDom(this, theValue);
      });
    }

    function removeDom(thing, otherThing) {
      total -= otherThing;
      $(thing).remove();
      calculateTotal(total);
    }

    function calculateTotal(totalA) {
      $('#monthlySalary').children().text("Total Monthly Salary: " + (totalA/12).toFixed(2));
    }
});
