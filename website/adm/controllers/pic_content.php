<?php
/**
 * 图录内容控制器
 *
 * @author linzequan <lowkey361@gmail.com>
 *
 */
class Pic_content extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->checkLogin();
        $this->load->model('pic_content_model');
        $this->load->model('pic_clazz_model');
        $data['resource_url'] = $this->resource_url;
        $data['admin_info'] = $this->session->userdata('loginInfo');
        $data['base_url'] = $this->config->item('base_url');
        $data['current_menu'] = 'pic_content';
        $data['current_menu_text'] = '拍品管理';
        $data['sub_menu'] = array();
        $data['menu_list'] = $this->getMenuList();
        $this->data = $data;
    }


    public function index() {
        $this->data['pic_clazz'] = $this->pic_clazz_model->search();
        $this->data['pic_clazz'] = $this->data['pic_clazz']['data'];
        // var_dump($data['pic_clazz']);
        $this->showPage('pic_content_index', $this->data);
    }


    public function add($nid=0) {
        $this->data['nid'] = $nid;
        if($nid > 0) {
            // 更新
            $this->data['info'] = $this->pic_content_model->getDetail($nid);
            $this->showPage('pic_content_update', $this->data);
        } else {
            // 新增
            $this->showPage('pic_content_add', $this->data);
        }
    }


    public function get() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
            case 'getList':
                $page = $this->get_request('page');
                $size = $this->get_request('size');
                $keyword = $this->get_request('keyword');
                $clazz_id = $this->get_request('clazz_id');
                $result = $this->pic_content_model->getList($page, $size, $keyword, $clazz_id);
                break;
            case 'getPc':
                $clazz_id = $this->get_request('cid');
                $result = $this->pic_content_model->getPc($clazz_id);
                break;
            case 'getPcImg':
                $lot = $this->get_request('lot');
                $clazz_id = $this->get_request('clazz_id');
                $result = $this->pic_content_model->getPcImg($lot, $clazz_id);
                break;
        }
        echo json_encode($result);
    }

    public function post() {
        $actionxm = $this->get_request('actionxm');
        $result = array();
        switch($actionxm) {
            case 'upload_photo':
                if(!empty($_FILES)) {
                    $fileParts = pathinfo($_FILES['uploadfile']['name']);
                    $tempFile = $_FILES['uploadfile']['tmp_name'];
                    $targetFolder = '/public/pic_content/img/';
                    $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
                    if(!is_dir($targetPath)) mkdir($targetPath, 0777, true);
                    $now = time() . myrandom(8);
                    $fileName = $now . '_org.' . $fileParts['extension'];
                    $compressFileName = $now . '.' . $fileParts['extension'];
                    $targetFile = rtrim($targetPath, '/') . '/' . $fileName;
                    $compressTargetFile = rtrim($targetPath, '/') . '/' . $compressFileName;
                    $fileTypes = array('jpg', 'jpeg', 'gif', 'png');
                    if(in_array(strtolower($fileParts['extension']), $fileTypes)) {
                        move_uploaded_file($tempFile, $targetFile);
                        // 开始压缩图片
                        $this->compressImage($targetFile, $compressTargetFile);
                        $result = array('status'=> 0, 'name'=> 'http://' . $_SERVER['HTTP_HOST'] . $targetFolder . $compressFileName);
                    } else {
                        $result = array('status'=> -1, 'msg'=> '文件格式不正确');
                    }
                }
                break;
            case 'upload_contentImg':
                if(!empty($_FILES)) {
                    $fileParts = pathinfo($_FILES['file']['name']);
                    $tempFile = $_FILES['file']['tmp_name'];
                    $targetFolder = '/public/pic_content/img_contents/';
                    $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
                    if(!is_dir($targetPath)) mkdir($targetPath, 0777, true);
                    $now = time() . myrandom(8);
                    $fileName = $now . '_org.' . $fileParts['extension'];
                    $compressFileName = $now . '.' . $fileParts['extension'];
                    $targetFile = rtrim($targetPath, '/') . '/' . $fileName;
                    $compressTargetFile = rtrim($targetPath, '/') . '/' . $compressFileName;
                    $fileTypes = array('jpg', 'jpeg', 'gif', 'png');
                    if(in_array(strtolower($fileParts['extension']), $fileTypes)) {
                        move_uploaded_file($tempFile, $targetFile);
                        // 开始压缩图片
                        $this->compressImage($targetFile, $compressTargetFile);
                        $result = array('status'=> 0, 'name'=> 'http://' . $_SERVER['HTTP_HOST'] . $targetFolder . $compressFileName);
                    } else {
                        $result = array('status'=> -1, 'msg'=> '文件格式不正确');
                    }
                }
                break;
            case 'uploadPdf':
                if(!empty($_FILES)) {
                    // 判断文件大小
                    if($_FILES['uploadfile']['size'] > 1024*1024*100 || $_FILES['uploadfile']['error'] != UPLOAD_ERR_OK) {
                        $result = array('status'=> -1, 'msg'=> '文件不可超过100M！');
                    } else {
                        $fileParts = pathinfo($_FILES['uploadfile']['name']);
                        $tempFile = $_FILES['uploadfile']['tmp_name'];
                        $targetFolder = '/public/pdf/pic_content';
                        $targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
                        if(!is_dir($targetPath)) mkdir($targetPath, 0777, true);
                        $now = time() . myrandom(8);
                        $fileName = $now . '.' . $fileParts['extension'];
                        $targetFile = rtrim($targetPath, '/') . '/' . $fileName;
                        $fileTypes = array('pdf');
                        if(in_array(strtolower($fileParts['extension']), $fileTypes)) {
                            move_uploaded_file($tempFile, $targetFile);
                            $result = array('status'=> 0, 'name'=> 'http://' . $_SERVER['HTTP_HOST'] . $targetFolder . '/' . $fileName);
                        } else {
                            $result = array('status'=> -1, 'msg'=> '文件格式不正确');
                        }
                    }
                }
                break;
            case 'add':
                $params = $this->get_request('params');
                $nid = $this->get_request('nid');
                $result = $this->pic_content_model->add($nid, $params);
                break;
            case 'delete':
                $id = $this->get_request('id');
                $result = $this->pic_content_model->delete($id);
                break;
            case 'addExl':
                $dirname = $this->get_request('dir');
                $targetPath = '/public/pic_content/img2/';
                $targetDir = $_SERVER['DOCUMENT_ROOT'] . $targetPath . $dirname;
                // var_dump($targetDir);
                if(is_dir($targetDir)){
                    if(!empty($_FILES)) {
                        $file = iconv("utf-8", "gb2312", $_FILES['uploadExl']['tmp_name']);
                        include('libraries/PHPExcel.php');  //引入PHP EXCEL类
                        $objRead = new PHPExcel_Reader_Excel2007();   //建立reader对象
                        if(!$objRead->canRead($file)){
                            $objRead = new PHPExcel_Reader_Excel5();
                            if(!$objRead->canRead($file)){
                                die('No Excel!');
                            }
                        }
                        $cellName = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ');

                        $sheet = 0;
                        $obj = $objRead->load($file);  //建立excel对象
                        $currSheet = $obj->getSheet($sheet);   //获取指定的sheet表
                        $columnH = $currSheet->getHighestColumn();   //取得最大的列号
                        $columnCnt = array_search($columnH, $cellName);
                        $rowCnt = $currSheet->getHighestRow();   //获取总行数

                        $data = array();
                        $dataKey = array("num", "title_tc", "title_en", "prize_en", "spec", "descript_tc", "daihao", "pic");
                        $dataVal = array();
                        for($_row=1; $_row<=$rowCnt; $_row++){  //读取内容
                            if($_row==1) {

                            } else{
                                for($_column=0; $_column<=$columnCnt; $_column++){
                                    $cellId = $cellName[$_column].$_row;
                                    $cellValue = $currSheet->getCell($cellId)->getValue();
                                    //$cellValue = $currSheet->getCell($cellId)->getCalculatedValue();  #获取公式计算的值
                                    if($cellValue instanceof PHPExcel_RichText){   //富文本转换字符串
                                        $cellValue = $cellValue->__toString();
                                    }
                                    array_push($dataVal, $cellValue);

                                }
                                $data[$_row-2] = $dataVal;

                                $dataVal = array();

                            }
                        }
                        foreach ($data as &$v) {
                            $v[3] = number_format($v[3]);
                            $v[4] = number_format($v[4]);
                            $v[3] = $v[3].' - '.$v[4];
                            array_splice($v,4,1);
                            $v = array_combine($dataKey, $v);
                            // var_dump($v['num']);
                            $countP = intval($v['pic']);
                            $picArr = array();
                            for ($i=1; $i <= $countP; $i++) {
                                $pic = 'http://' . $_SERVER['HTTP_HOST'] . $targetPath . $dirname . '/large/LOTNO_' . $v['num'] . '_' . $i . '.jpg';
                                array_push($picArr, $pic);
                            }
                            $v['pic'] = implode(",", $picArr);
                            $v['clazz_id'] = $this->get_request('clazz_id');
                            $v['create_time'] = time();
                            $v['sort'] = 100;

                        }
                        $result = $this->pic_content_model->addExl($data);
                    }
                }else{
                    $result['status'] = 1;
                    $result['msg'] = '請確認目錄是否正確';
                }
                break;
        }
        echo json_encode($result);
    }
}
