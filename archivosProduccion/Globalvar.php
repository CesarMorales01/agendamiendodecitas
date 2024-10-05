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
        $this->globalVars->urlRoot = "http://gestionagendamientocitas.tupaginaweb.site/";
        $this->globalVars->myUrl = "http://agendamientodecitas.tupaginaweb.site/";
    }


    public function getGlobalVars()
    {
        return $this->globalVars;
    }
}
