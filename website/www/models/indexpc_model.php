<?php
/**
 * 首頁拍品模型
 *
 * @author qoohj <qoohj@qq.com>
 *
 */
class Indexpc_model extends MY_Model {

    public function __construct() {
        parent::__construct();
        $this->table = 'curio_indexpc';
        $this->fields = 'id, clazz_id, lot1, pic1, lot2, pic2, lot3, pic3, lot4, pic4, status, sort';
    }


    /**
     * 查询菜单数据
     * @return [type] [description]
     */
    public function search() {
        $query = $this->db->where('status',1)->order_by('sort desc, id asc')->get($this->table);
        $list = $query->result_array();
        foreach ($list as $k => &$v) {
            // code...
            $v['pic1'] = substr_replace($v['pic1'], '_thumb', strpos($v['pic1'],'.'), 0);
            $v['pic2'] = substr_replace($v['pic2'], '_thumb', strpos($v['pic2'],'.'), 0);
            $v['pic3'] = substr_replace($v['pic3'], '_thumb', strpos($v['pic3'],'.'), 0);
            $v['pic4'] = substr_replace($v['pic4'], '_thumb', strpos($v['pic4'],'.'), 0);
            $v['clazz'] = $this->pic_clazz_model->searchOne($v['clazz_id']);
            $v['pc1'] = $this->pic_content_model->searchOne($v['clazz_id'], $v['lot1']);
            $v['pc2'] = $this->pic_content_model->searchOne($v['clazz_id'], $v['lot2']);
            $v['pc3'] = $this->pic_content_model->searchOne($v['clazz_id'], $v['lot3']);
            $v['pc4'] = $this->pic_content_model->searchOne($v['clazz_id'], $v['lot4']);
        }
        return array(
            'status'    => 0,
            'list'       => $list
        );
        // return $list;
    }



}
