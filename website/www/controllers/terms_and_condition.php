<?php
/**
 * 公司简介控制器
 *
 * @author qoohj <qoohj@qq.com>
 *
 */
class Terms_and_condition extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->init_head_foot();
    }


    public function index() {
      $this->load->model('static_model');
      $this->data['tandc'] = $this->static_model->tandc();
      $this->showPage('terms_and_condition_index', $this->data);
    }


    public function get() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
          case 'search':
              // $result = $this->banner_model->search();
              break;
        }
        echo json_encode($result);
    }


    public function post() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
        }
        echo json_encode($result);
    }

}
