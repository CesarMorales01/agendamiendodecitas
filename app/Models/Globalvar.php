<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use stdClass;

class Globalvar extends Model
{
    use HasFactory;

    public $globalVars;

    function __construct()
    {
        $this->globalVars = new stdClass();
        $this->globalVars->urlRoot = "http://gestionagendamientocitas.test/";
        $this->globalVars->myUrl = "http://agendamientodecitas.test/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
