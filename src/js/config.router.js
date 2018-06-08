'use strict';

/**
* Config for the router
*/
angular.module('app')
  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
      }
    ]
  )
  .config(
    ['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {

          $urlRouterProvider
              .otherwise('/app/dashboard-v1');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/dashboard/app_dashboard_v1.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load(['js/controllers/chart.js']);
                      } ]
                  }
              })
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/dashboard/app_dashboard_v2.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load(['js/controllers/chart.js']);
                      } ]
                  }
              })
            .state('app.docs', {
                url: '/docs',
                templateUrl: 'tpl/docs/docs.html'
            })

          //日历
            .state('app.calendar', {
                url: '/calendar',
                templateUrl: 'tpl/calendar/app_calendar.html',
                // 使用resolve来加载其他依赖项
                resolve: {
                    deps: ['$ocLazyLoad', 'uiLoad',
                    function ($ocLazyLoad, uiLoad) {
                        return uiLoad.load(
                        ['vendor/jquery/fullcalendar/fullcalendar.css',
                            'vendor/jquery/fullcalendar/theme.css',
                            'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                            'vendor/libs/moment.min.js',
                            'vendor/jquery/fullcalendar/fullcalendar.min.js',
                            'js/app/calendar/calendar.js']
                        ).then(
                        function () {
                            return $ocLazyLoad.load('ui.calendar');
                        }
                        )
                    } ]
                }
            })
           .state('app.mail', {
               abstract: true,
               url: '/mail',
               templateUrl: 'tpl/mail/mail.html',
               // 使用 resolve 去加载其他的依赖项
               resolve: {
                   deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/app/mail/mail.js',
                                               'js/app/mail/mail-service.js',
                                               'vendor/libs/moment.min.js']);
                        } ]
               }
           })
            .state('app.mail.list', {
                url: '/inbox/{fold}',
                templateUrl: 'tpl/mail/mail.list.html'
            })
            .state('app.mail.detail', {
                url: '/{mailId:[0-9]{1,4}}',
                templateUrl: 'tpl/mail/mail.detail.html'
            })
            .state('app.mail.compose', {
                url: '/compose',
                templateUrl: 'tpl/mail/mail.new.html'
            })
            .state('apps', {
                abstract: true,
                url: '/apps',
                templateUrl: 'tpl/apps/layout.html'
            })
            .state('apps.note', {
                url: '/note',
                templateUrl: 'tpl/apps/apps_note.html',
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/app/note/note.js',
                                            'vendor/libs/moment.min.js']);
                    } ]
                }
            })
            .state('apps.contact', {
                url: '/contact',
                templateUrl: 'tpl/apps/apps_contact.html',
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/app/contact/contact.js']);
                    } ]
                }
            })
            .state('app.weather', {
                url: '/weather',
                templateUrl: 'tpl/apps/apps_weather.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'angular-skycons',
                                files: ['js/app/weather/skycons.js',
                                        'vendor/libs/moment.min.js',
                                        'js/app/weather/angular-skycons.js',
                                        'js/app/weather/ctrl.js']
                            }
                        );
                    } ]
                }
            })


             .state('app.ui', {
                 url: '/ui',
                 template: '<div ui-view class="fade-in-up"></div>'
             })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/ui/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/ui/ui_icons.html'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/ui/ui_grid.html'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/ui/ui_widgets.html'
              })
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'tpl/ui/ui_bootstrap.html'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/ui/ui_sortable.html'
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/ui/ui_portlet.html'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/ui/ui_timeline.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/ui/ui_tree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function () {
                                  return $ocLazyLoad.load('js/controllers/tree.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/ui/ui_toaster.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('toaster').then(
                              function () {
                                  return $ocLazyLoad.load('js/controllers/toaster.js');
                              }
                          );
                        } ]
                  }
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/ui/ui_jvectormap.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load('js/controllers/vectormap.js');
                        } ]
                  }
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/ui/ui_googlemap.html',
                  resolve: {
                      deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load([
                            'js/app/map/load-google-maps.js',
                            'js/app/map/ui-map.js',
                            'js/app/map/map.js']).then(
                              function () {
                                  return loadGoogleMaps();
                              }
                            );
                        } ]
                  }
              })

          //表格
            .state('app.table', {
                url: '/table',
                template: '<div ui-view></div>'
            })
            .state('app.table.static', {
                url: '/static',
                templateUrl: 'tpl/table/table_static.html'
            })
            .state('app.table.datatable', {
                url: '/datatable',
                templateUrl: 'tpl/table/table_datatable.html'
            })
            .state('app.table.footable', {
                url: '/footable',
                templateUrl: 'tpl/table/table_footable.html'
            })
            .state('app.table.grid', {
                url: '/grid',
                templateUrl: 'tpl/table/table_grid.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('ngGrid').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/grid.js');
                            }
                        );
                    } ]
                }
            })

          //表单
            .state('app.form', {
                url: '/form',
                template: '<div ui-view class="fade-in"></div>',
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load('js/controllers/form.js');
                    } ]
                }
            })
            .state('app.form.elements', {
                url: '/elements',
                templateUrl: 'tpl/form/form_elements.html'
            })
            .state('app.form.validation', {
                url: '/validation',
                templateUrl: 'tpl/form/form_validation.html'
            })
            .state('app.form.wizard', {
                url: '/wizard',
                templateUrl: 'tpl/form/form_wizard.html'
            })
            .state('app.form.fileupload', {
                url: '/fileupload',
                templateUrl: 'tpl/form/form_fileupload.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('angularFileUpload').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/file-upload.js');
                            }
                        );
                    } ]
                }
            })
            .state('app.form.imagecrop', {
                url: '/imagecrop',
                templateUrl: 'tpl/form/form_imagecrop.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('ngImgCrop').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/imgcrop.js');
                            }
                        );
                    } ]
                }
            })
            .state('app.form.select', {
                url: '/select',
                templateUrl: 'tpl/form/form_select.html',
                controller: 'SelectCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('ui.select').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/select.js');
                            }
                        );
                    } ]
                }
            })
            .state('app.form.slider', {
                url: '/slider',
                templateUrl: 'tpl/form/form_slider.html',
                controller: 'SliderCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('vr.directives.slider').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/slider.js');
                            }
                        );
                    } ]
                }
            })
            .state('app.form.editor', {
                url: '/editor',
                templateUrl: 'tpl/form/form_editor.html',
                controller: 'EditorCtrl',
                resolve: {
                    deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load('textAngular').then(
                            function () {
                                return $ocLazyLoad.load('js/controllers/editor.js');
                            }
                        );
                    } ]
                }
            })
          //图表
            .state('app.chart', {
                url: '/chart',
                templateUrl: 'tpl/chart/ui_chart.html',
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load('js/controllers/chart.js');
                    } ]
                }
            })

          //页面
            .state('app.page', {
                url: '/page',
                template: '<div ui-view class="fade-in-down"></div>'
            })
            .state('app.page.profile', {
                url: '/profile',
                templateUrl: 'tpl/page/page_profile.html'
            })
            .state('app.page.post', {
                url: '/post',
                templateUrl: 'tpl/page/page_post.html'
            })
            .state('app.page.search', {
                url: '/search',
                templateUrl: 'tpl/page/page_search.html'
            })
            .state('app.page.invoice', {
                url: '/invoice',
                templateUrl: 'tpl/page/page_invoice.html'
            })
            .state('app.page.price', {
                url: '/price',
                templateUrl: 'tpl/page/page_price.html'
            })
          //其他
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/lockme/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/access/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/controllers/signin.js']);
                        } ]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/access/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function (uiLoad) {
                            return uiLoad.load(['js/controllers/signup.js']);
                        } ]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/access/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/access/page_404.html'
              })

          //布局
            .state('layout', {
                abstract: true,
                url: '/layout',
                templateUrl: 'tpl/layout/layout.html'
            })
            .state('layout.fullwidth', {
                url: '/fullwidth',
                views: {
                    '': {
                        templateUrl: 'tpl/layout/layout_fullwidth.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout/layout_footer_fullwidth.html'
                    }
                },
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/controllers/vectormap.js']);
                    } ]
                }
            })
            .state('layout.mobile', {
                url: '/mobile',
                views: {
                    '': {
                        templateUrl: 'tpl/layout/layout_mobile.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout/layout_footer_mobile.html'
                    }
                }
            })
            .state('layout.app', {
                url: '/app',
                views: {
                    '': {
                        templateUrl: 'tpl/layout/layout_app.html'
                    },
                    'footer': {
                        templateUrl: 'tpl/layout/layout_footer_fullwidth.html'
                    }
                },
                resolve: {
                    deps: ['uiLoad',
                    function (uiLoad) {
                        return uiLoad.load(['js/controllers/tab.js']);
                    } ]
                }
            })

      } ]
  );