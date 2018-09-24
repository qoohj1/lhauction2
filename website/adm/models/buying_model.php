<?php
/**
 * buying静态页面模型
 *
 * @author huangjiang <qoohj@qq.com>
 *
 */
class Buying_model extends MY_Model {

    private $table = 'curio_buying';
    private $fields = 'id, banner, des_tc, des_en, web_pic1, web_t1_tc, web_t1_en, web_href1, web_pic2, web_t2_tc, web_t2_en, web_href2, web_pic3, web_t3_tc, web_t3_en, web_href3';
    private $table2 = 'curio_static';
    private $fields2 = 'id, pic, name_en, name_tc, content_en, content_tc, descript_en, descript_tc';

    public function __construct() {
        parent::__construct();
    }

    /**
     * 新增/更新文章
     * @param [type] $nid    [description]
     * @param [type] $params [description]
     */
     public function update($nid, $params) {
         // $params['update_time'] = time();
         // $params['update_userid'] = $this->loginInfo['id'];
         $this->db->where('id', $nid)->update($this->table, $params);
         $result['status'] = 0;
         $result['msg'] = '更新成功！';
         return $result;
     }



    /**
     * 删除
     * @param  [type] $id   [description]
     * @return [type]       [description]
     */
    public function deleteItem($id) {
        $this->db->where('id', $id)->delete($this->table);
        $result['status'] = 0;
        $result['msg'] = '删除成功';
        return $result;
    }


    /**
     * 获取广告详情
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function getDetail() {
        $query = $this->db->query('select ' . $this->fields . ' from ' . $this->table);
        $result = $query->result_array();
        $query2 = $this->db->query('select ' . $this->fields2 . ' from ' . $this->table2.' where id=2');
        $result2 = $query2->result_array();
        $result[0]['name_en'] = $result2[0]['name_en'];
        $result[0]['name_tc'] = $result2[0]['name_tc'];
        return $result[0];
    }
}
