<?php
/**
 * 图录分类模型
 *
 * @author linzequan <lowkey361@gmail.com>
 *
 */
class Pic_clazz_model extends MY_Model {

    public function __construct() {
        parent::__construct();
        $this->table = 'curio_pic_clazz';
        $this->fields = 'id, name_en, name_tc, parent_id, sort, pdf, create_time, update_time';
        $this->loginInfo = $this->session->userdata('loginInfo');
    }


    /**
     * 查询菜单数据
     * @return [type] [description]
     */
    public function search() {
        $query1 = $this->db->select($this->fields)->where('parent_id =',0)->order_by(' sort desc,id desc')->get($this->table);
        $query2 = $this->db->select($this->fields)->where('parent_id !=',0)->order_by(' sort desc,id asc')->get($this->table);
        $list1 = $query1->result_array();
        $list2 = $query2->result_array();
        $list = array_merge($list1,$list2);

        foreach($list as &$item) {
            if($item['create_time']) {
                $item['create_time'] = date('Y-m-d', $item['create_time']);
            } else {
                $item['create_time'] = '';
            }
            if($item['update_time']) {
                $item['update_time'] = date('Y-m-d', $item['update_time']);
            } else {
                $item['update_time'] = '';
            }
        }

        $tree = array();
        create_tree_list($list, $tree, 0, 0, array('id_key'=>'id', 'pid_key'=> 'parent_id'));
        return array(
            'status'    => 0,
            'msg'       => '操作成功！',
            'data'      => array_values($tree)
        );
    }


    /**
     * 添加数据
     * @param [type] $params [description]
     */
    public function add($params) {
        $msg = '';
        if($params['parent_id']=='') $msg = '上级菜单不可为空！';
        if($params['name_en']=='') $msg = '分类英文名称不可为空！';
        if($params['name_tc']=='') $msg = '分类繁体名称不可为空！';

        if($msg != '') {
            return array(
                'status'    => -1,
                'msg'       => $msg
            );
        }

        $data = array(
            'name_en'       => $params['name_en'],
            'name_tc'       => $params['name_tc'],
            'parent_id'     => $params['parent_id'],
            'sort'          => $params['sort'],
            'create_time'   => strtotime($params['create_time']),
            'pdf'           => $params['pdf']
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
            'parent_id'     => $params['parent_id'],
            'sort'          => $params['sort'],
            'create_time'   => strtotime($params['create_time']),
            'pdf'           => $params['pdf'],
            'update_time'   => time()
        );
        $this->db->where($where)->update($this->table, $data);
        return array(
            'status'    => 0,
            'msg'       => '操作成功！'
        );
    }


    public function delete($id) {
        // 查询当前分类下是否有子分类，有的话则不允许删除
        $query = $this->db->query('select count(1) as num from ' . $this->table . ' where `parent_id`=' . $id);
        $result = $query->result_array();
        if($result[0]['num'] > 0) {
            return array(
                'status'    => -1,
                'msg'       => '当前菜单下存在子分类，请先删除子分类！'
            );
        }

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
    public function getClazzById($id) {
        $query = $this->db->query('select ' . $this->fields . ' from ' . $this->table . ' where `id`=' . $id);
        $result = $query->result_array();
        foreach($result as &$item) {
            if($item['create_time']) {
                $item['create_time'] = date('Y-m-d', $item['create_time']);
            } else {
                $item['create_time'] = '';
            }
            if($item['update_time']) {
                $item['update_time'] = date('Y-m-d', $item['update_time']);
            } else {
                $item['update_time'] = '';
            }
        }
        return array(
            'status'    => 0,
            'msg'       => '操作成功！',
            'data'      => $result[0]
        );
    }


    /**
     * 获取分类树
     * @return [type] [description]
     */
    public function getClazzTree() {
        $query = $this->db->query('select ' . $this->fields . ' from ' . $this->table);
        $result = $query->result_array();
        $tree = array();
        // 将分类ID作为数组KEY，并创建children单元
        foreach($result as $v) {
            $tree[$v['id']] = $v;
            $tree[$v['id']['children']] = array();
        }
        // 利用引用，将每个分类添加到父类children数组中
        foreach($tree as $k=>$v) {
            if($v['parent_id'] != 0) {
                $tree[$v['parent_id']]['children'][] = &$tree[$k];
                if($tree[$k]['children'] == null) {
                    unset($tree[$k]['children']);
                }
            }
        }
        // 删除无用的非根节点数据
        foreach($tree as $k=>$v) {
            if($v['parent_id'] != 0) {
                unset($tree[$k]);
            }
        }

        return array(
            'status'    => 0,
            'msg'       => '操作成功！',
            'data'      => $tree
        );
    }
}
