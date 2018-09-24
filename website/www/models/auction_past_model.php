<?php
/**
 * 往届拍卖会模型
 *
 * @author qoohj <qoohj@qq.com>
 *
 */
class Auction_past_model extends MY_Model {

    public function __construct() {
        parent::__construct();
        $this->table = 'curio_pic_clazz';
        $this->table2 = 'curio_pic_content';
        // $fields = 'id, title_en, title_tc, clazz_id, pic, num, prize_en, prize_tc, size_en, size_tc, standard_en, standard_tc, descript_en, descript_tc, sort';
    }


    public function getDate() {
        $query = $this->db->select('create_time')->where('parent_id', 0)->order_by('create_time desc')->get($this->table);
        $list = $query->result_array();
        return $list;
    }


    /**
     * 查询菜单数据
     * @return [type] [description]
     */
    public function search($aid, $page=1, $size=2) {
        $limitStart = ($page - 1) * $size;
        if(!empty($aid)){
          $query = $this->db->where('parent_id', $aid)->order_by('create_time desc,sort desc, id asc')->get($this->table);
        }else{
          $query = $this->db->where('parent_id !=', '0')->order_by('parent_id desc,sort desc, id asc')->get($this->table);
        }
        $list = $query->result_array();
        $picArr = array();
        $thumbArr = array();
        $cidArr = array();
        foreach ($list as $k1=>&$v) {
            $pid = $v['parent_id'];
            $create_time = $this->db->select('create_time')->where('parent_id', $pid)->get($this->table)->row()->create_time;
          $v['create_time'] = $create_time;
          $id = $v['id'];
          $items = $this->db->where('clazz_id', $id)->order_by('num','RANDOM')->limit(5)->get($this->table2)->result_array();
          foreach ($items as $k2=>&$item) {
            array_push($cidArr, $item['id']);
            $pics = explode(',', $item['pic']);
            // $pics2 = array();
            // foreach ($pics as $pic) {
            //     $size = getimagesize($this->config->item('base_url').$pic);
            //     $show = $size[0]>=$size[1]?true:false;
            //     if($show){
            //         array_push($pics2, $pic);
            //     }
            // }
            // if($pics2){
            //     array_push($picArr, $pics2[0]);
            //     $v['img'] = $picArr;
            //     if(strpos($pics2[0], '/img2/')){
            //         $thumb = str_replace("/large/","/thumb/",$pics2[0]);
            //     }elseif(substr($pics2[0],0,8)==='/public/'){
            //         $num = strpos($pics2[0],'.');
            //         $thumb = substr_replace($pics2[0], '_thumb', $num, 0);
            //
            //     }else{
            //         $thumb = $pics2[0];
            //     }
            //     array_push($thumbArr, $thumb);
            //
            // }
            array_push($picArr, $pics[0]);
            $v['img'] = $picArr;
            if(strpos($pics[0], '/img2/')){
                $thumb = str_replace("/large/","/thumb/",$pics[0]);
            }elseif(substr($pics[0],0,8)==='/public/'){
                $num = strpos($pics[0],'.');
                $thumb = substr_replace($pics[0], '_thumb', $num, 0);

            }else{
                $thumb = $pics[0];
            }
            array_push($thumbArr, $thumb);
              // var_dump($thumbArr);
          }
          if($k1 == 1){
            // var_dump($picArr);
          }
          $v['img'] = $picArr;
          $v['thumb'] = $thumbArr;
          $v['cid'] = $cidArr;
          $cidArr = array();
          // var_dump($v['cid']);
          $thumbArr = array();
          $picArr = array();
          $v['period'] = $this->db->where('id', $v['parent_id'])->get($this->table)->row()->name_en;
          preg_match('/\d+/',$v['period'],$v['period']);
          $v['period'] = $v['period'][0];
        }

        // var_dump($list);
        // $pageQuery = $this->db->query('select count(1) as num from ' . $this->table);
        // $pageResult = $pageQuery->result_array();
        // $num = $pageResult[0]['num'];
        // $rtn = array(
        //     'total' => $num,
        //     'size'  => $size,
        //     'page'  => $page,
        //     'list'  => $list
        // );
        // return $rtn;

        return $list;
    }



}
