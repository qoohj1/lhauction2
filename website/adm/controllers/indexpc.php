<?php
/**
 * 首頁拍品管理
 *
 * @author qoohj <qoohj@qq.com>
 *
 */
class Indexpc extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->checkLogin();
        $this->load->model('indexpc_model');
        $this->load->model('pic_clazz_model');
        $this->load->model('pic_content_model');
        $data['resource_url'] = $this->resource_url;
        $data['admin_info'] = $this->session->userdata('loginInfo');
        $data['base_url'] = $this->config->item('base_url');
        $data['current_menu'] = 'pc';
        $data['sub_menu'] = array();
        $data['current_menu_text'] = '首頁拍品管理';
        $data['menu_list'] = $this->getMenuList();
        $this->data = $data;
    }


    public function index() {
        $this->data['pic_clazz'] = $this->pic_clazz_model->search();
        $this->data['pic_clazz'] = $this->data['pic_clazz']['data'];
        // $this->data['pic_content'] = $this->pic_content_model->search();
        $this->load->view('include/_header', $this->data);
        $this->load->view('indexpc_index', $this->data);
        $this->load->view('include/_footer', $this->data);
    }

    public function get() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
            case 'getPc':
                // $page = $this->get_request('page');
                // $size = $this->get_request('size');
                // $classify = $this->get_request('classify');
                $result = $this->indexpc_model->getPc();
                break;
            case 'getDetail':
                $id = $this->get_request('id');
                $result = $this->indexpc_model->getDetail($id);
                break;
        }
        echo json_encode($result);
    }

    public function post() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
            case 'updatePc':
                $id = $this->get_request('id');
                $data = $this->get_request('params');
                $result = $this->indexpc_model->updatePc($id, $data);
                break;
        }
        echo json_encode($result);
    }
}
