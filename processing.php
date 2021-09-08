<?php
session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$isValid = true;
$xStr = $_REQUEST['x'];
$yStr = $_REQUEST['y'];
$rStr = $_REQUEST['r'];
$x = $xStr;
$y = $yStr;
$r = $rStr;
$out = "";
$now = date("H:i:s");
$response = "";
$maximum = 10;
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r))
        $isValid = false;
    if (strlen($y) > $maximum || strlen($x) > $maximum || strlen($r) > $maximum)
        $isValid = false;

    if ($x < -3 || $x > 5)
        $isValid = false;
    if ($r < 2 || $r > 5)
        $isValid = false;
    if ($y < -5 || $y > 3)
        $isValid = false;

    if (!$isValid) {
        header("Status: 400 Bad Request", true, 400);
        exit;
    }
    if ((($x >= 0) && ($x <= $r / 2) && ($y >= 0) && ($y <= $r / 2)) ||
        (($x >= 0) && ($x <= $r / 2) && ($y <= 0) && ($y >= -$r)) ||
        (($x <= 0) && ($x >= -$r / 2) && ($y >= 0) && ($y >= $r / 2))) {
        $out = "<span style='color: green'>True</span>";
    } else {
        $out = "<span style='color: red'>False</span>";
    }
    $calc_time = microtime(true) - $start;
    $answer = array($xStr, $yStr, $rStr, $out, $now, $calc_time);
    array_push($_SESSION['data'], $answer);
}
?>
<table align="center" class="result_table">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Sending time</th>
        <th>Total processing time</th>
    </tr>
    <?php foreach ($_SESSION['data'] as $word) { ?>
        <tr>
            <td><?php echo $word[0] ?></td>
            <td><?php echo $word[1] ?></td>
            <td><?php echo $word[2] ?></td>
            <td><?php echo $word[3] ?></td>
            <td><?php echo $word[4] ?></td>
            <td><?php echo number_format($word[5], 10, ".", "") . " sec" ?></td>
        </tr>
    <?php } ?>
</table>

