function User(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.username = ko.observable(data.username);
    this.emailid = ko.observable(data.emailid);
    this.password = ko.observable(data.password);
}

function UserListViewModel() {
    var self = this;
    self.user_list = ko.observableArray([]);
    self.name = ko.observable();
    self.username= ko.observable();
    self.emailid= ko.observable();
    self.password= ko.observable();
    self.addUser = function() {
        self.save();
        self.name("");
        self.username("");
        self.emailid("");
        self.password("");
    };
    self.save = function() {
        return $.ajax({
            url: '/api/v1/users',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({
                'name': self.name(),
                'username': self.username(),
                'emailid': self.emailid(),
                'password': self.password()
            }),
            success: function(data) {
                alert("success")
                console.log("Pushing to users array");
                self.push(new User({ name: data.name, username: data.username,emailid: data.emailid ,password: data.password}));
                return;
            },
            error: function() {
                return console.log("Failed");
            }
        });
    };

    $.getJSON('/api/v1/users', function(userModels) {
        var t = $.map(userModels.user_list, function(item) {
                    return new User(item);
                });
                // console.log(userModels.user_list)
        self.user_list(t);
    });
}

ko.applyBindings(new UserListViewModel());

