<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Pizza;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\validator;
use Illuminate\Support\Facades\Storage;


class PizzaController extends Controller
{

    public function index() {
        $pizzas = Pizza::all();

        return response() -> json([
            'status' => 200,
            'pizzas' => $pizzas,
        ]);

    }

    public function store(Request $request) {
        $validator = Validator::make($request -> all(), [
            'name' => 'required|max:191',
            'price' => 'required|min:0',
            'descrip' => 'required|max:191',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator -> fails()) {
            return response() -> json([
                'status' => 422,
                'errors' => $validator -> messages(),
            ]);
        }
        else {
            $pizza = new Pizza;
            $pizza -> name = $request -> input('name');
            $pizza -> price = $request -> input('price');
            $pizza -> description = $request -> input('descrip');

            if($request -> hasFile('image')) {
                $file = $request -> file('image');
                $extension = $file -> getClientOriginalExtension();
                $filename = time().'.'.$extension;
                $file -> move('uploads/pizza/', $filename);
                $pizza -> image = 'uploads/pizza/'.$filename;
            }

            $pizza -> available = $request -> input('avail') == true ? '0':'1';
            $pizza -> save();

            return response() -> json([
                'status' => 200,
                'message' => 'Pizza Added Successfully',
            ]); 
        }
    }
    public function edit($id) {
        $pizza = Pizza::find($id);
        if($pizza) {
            return response() -> json([
                'status' => 200,
                'pizza' => $pizza,
            ]);
        }
        else {
            return response() -> json([
                'status' => 404,
                'message' => 'Product Not Found',
            ]);
        }
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request -> all(), [
            'name' => 'required|max:191',
            'price' => 'required|min:0',
            'descrip' => 'required|max:191',
        ]);

        if ($validator -> fails()) {
            return response() -> json([
                'status' => 422,
                'errors' => $validator -> messages(),
            ]);
        }
        else {
            $pizza = Pizza::find($id);
            if ($pizza) {
                $pizza -> name = $request -> input('name');
                $pizza -> price = $request -> input('price');
                $pizza -> description = $request -> input('descrip');
    
                if($request -> hasFile('image')) {
                    $path = $pizza -> image;
                    if (Storage::exists($path)) {
                        Storage::delete($path);
                    }

                    $file = $request -> file('image');
                    $extension = $file -> getClientOriginalExtension();
                    $filename = time().'.'.$extension;
                    $file -> move('uploads/pizza/', $filename);
                    $pizza -> image = 'uploads/pizza/'.$filename;
                }
    
                $pizza -> available = $request -> input('avail') == true ? '0':'1';
                $pizza -> update();
    
                return response() -> json([
                    'status' => 200,
                    'message' => 'Pizza Updated Successfully',
                ]); 
            }
            else {
                return response() -> json([
                    'status' => 404,
                    'message' => 'Pizza Not Found',
                ]); 
            }
        }
    }

    public function destroy($id) {
        $pizza = Pizza::find($id);
        if ($pizza) {
            $pizza -> delete();
            return response() -> json([
                'status' => 200,
                'message' => 'Pizza Deleted Successfully',
            ]); 
        }
        else {
            return response() -> json([
                'status' => 404,
                'message' => 'Pizza Not Found',
            ]); 
        }
    }

}
