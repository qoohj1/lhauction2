<?php
/**
 * 索取分类模型
 *
 * @author qoohj <qoohj@qq.com>
 *
 */
class Cata_request_model extends MY_Model {

    public function __construct() {
        parent::__construct();
        $this->table = 'curio_catagory';
        $this->fields = 'id, name_en, name_tc, sort, status';
        $this->loginInfo = $this->session->userdata('loginInfo');
    }


    /**
     * 查询菜单数据
     * @return [type] [description]
     */
    public function search() {
        $query = $this->db->order_by('sort desc,id asc')->get($this->table);
        $list = $query->result_array();
        $status = ['hide', 'show'];
        foreach($list as &$item) {
          if(isset($item['status'])){
            $item['status'] = $status[$item['status']];
          }else{
            $item['status'] = '';
          }
        }
        return array(
            'status'    => 0,
            'msg'       => '操作成功！',
            'data'      => $list
        );
    }


    /**
     * 添加数据
     * @param [type] $params [description]
     */
    public function add($params) {
        $msg = '';
        if($params['name_en']=='') $msg = '名称不可为空！';
        if($params['name_tc']=='') $msg = '名称不可为空！';

        if($msg != '') {
            return array(
                'status'    => -1,
                'msg'       => $msg
            );
        }

        $data = array(
            'name_en'       => $params['name_en'],
            'name_tc'       => $params['name_tc'],
            'status'        => $params['status'],
            'sort'          => $params['sort']
        );
        $this->db->insert($this->table, $data);
        return array(
            'status'    => 0,
            'msg'       => '操作成功！'
        );
    }


    /**
     * 更新数据
     * @param  [type] $params [description]
     * @param  [type] $where  [description]
     * @return [type]         [description]
     */
    public function update($params, $where) {
        $data = array(
            'name_en'       => $params['name_en'],
            'name_tc'       => $params['name_tc'],
            'status'       => $params['status'],
            'sort'          => $params['sort'],
        );
        $this->db->where($where)->update($this->table, $data);
        return array(
            'status'    => 0,
            'msg'       => '操作成功！'
        );
    }


    public function delete($id) {
        $this->db->delete($this->table, array('id'=> $id));
        return array(
            'status'    => 0,
            'msg'       => '操作成功！'
        );
    }

    /**
     * 根据分类ID查询分类信息
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getById($id) {
        $query = $this->db->query('select ' . $this->fields . ' from ' . $this->table . ' where `id`=' . $id);
        $result = $query->result_array();
        return array(
            'status'    => 0,
            'msg'       => '操作成功！',
            'data'      => $result[0]
        );
    }


}
