app.controller('MailCtrl', ['$scope', function ($scope) {
    $scope.folds = [
    { name: '收件箱', filter: '' },
    { name: '加星邮件', filter: 'starred' },
    { name: '发送', filter: 'sent' },
    { name: '重要', filter: 'important' },
    { name: '草稿箱', filter: 'draft' },
    { name: '垃圾箱', filter: 'trash' }
  ];

    $scope.labels = [
    { name: '产品', filter: 'project', color: '#23b7e5' },
    { name: '开发', filter: 'develop', color: '#7266ba' },
    { name: '文档', filter: 'docs', color: '#fad733' },
    { name: '会议', filter: 'meeting', color: '#27c24c' }
  ];

    $scope.addLabel = function () {
        $scope.labels.push(
      {
          name: $scope.newLabel.name,
          filter: angular.lowercase($scope.newLabel.name),
          color: '#ccc'
      }
    );
        $scope.newLabel.name = '';
    }

    $scope.labelClass = function (label) {
        return {
            'b-l-info': angular.lowercase(label) === 'angular',
            'b-l-primary': angular.lowercase(label) === 'bootstrap',
            'b-l-warning': angular.lowercase(label) === 'client',
            'b-l-success': angular.lowercase(label) === 'work'
        };
    };

} ]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function ($scope, mails, $stateParams) {
    $scope.fold = $stateParams.fold;
    mails.all().then(function (mails) {
        $scope.mails = mails;
    });
} ]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function ($scope, mails, $stateParams) {
    mails.get($stateParams.mailId).then(function (mail) {
        $scope.mail = mail;
    })
} ]);

app.controller('MailNewCtrl', ['$scope', function ($scope) {
    $scope.mail = {
        to: '',
        subject: '',
        content: ''
    }
    $scope.tolist = [
    { name: 'James', email: 'james@gmail.com' },
    { name: 'Luoris Kiso', email: 'luoris.kiso@hotmail.com' },
    { name: 'Lucy Yokes', email: 'lucy.yokes@gmail.com' }
  ];
} ]);

angular.module('app').directive('labelColor', function () {
    return function (scope, $el, attrs) {
        $el.css({ 'color': attrs.color });
    }
});