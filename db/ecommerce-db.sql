PGDMP      *                 }         	   ecommerce    17.2    17.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388 	   ecommerce    DATABASE     |   CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE ecommerce;
                     postgres    false            �            1259    16412    orderproductmap    TABLE        CREATE TABLE public.orderproductmap (
    id integer NOT NULL,
    orderid integer NOT NULL,
    productid integer NOT NULL
);
 #   DROP TABLE public.orderproductmap;
       public         heap r       postgres    false            �            1259    16411    orderproductmap_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orderproductmap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.orderproductmap_id_seq;
       public               postgres    false    221            �           0    0    orderproductmap_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.orderproductmap_id_seq OWNED BY public.orderproductmap.id;
          public               postgres    false    220            �            1259    16397    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    orderdescription character varying(100) NOT NULL,
    createdat timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    16396    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public               postgres    false    218            �           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public               postgres    false    217            �            1259    16404    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    productname character varying(100) NOT NULL,
    productdescription text
);
    DROP TABLE public.products;
       public         heap r       postgres    false            ,           2604    16415    orderproductmap id    DEFAULT     x   ALTER TABLE ONLY public.orderproductmap ALTER COLUMN id SET DEFAULT nextval('public.orderproductmap_id_seq'::regclass);
 A   ALTER TABLE public.orderproductmap ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    220    221            *           2604    16400 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16412    orderproductmap 
   TABLE DATA           A   COPY public.orderproductmap (id, orderid, productid) FROM stdin;
    public               postgres    false    221   �       �          0    16397    orders 
   TABLE DATA           A   COPY public.orders (id, orderdescription, createdat) FROM stdin;
    public               postgres    false    218   �       �          0    16404    products 
   TABLE DATA           G   COPY public.products (id, productname, productdescription) FROM stdin;
    public               postgres    false    219          �           0    0    orderproductmap_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.orderproductmap_id_seq', 15, true);
          public               postgres    false    220            �           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 5, true);
          public               postgres    false    217            2           2606    16417 $   orderproductmap orderproductmap_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.orderproductmap
    ADD CONSTRAINT orderproductmap_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.orderproductmap DROP CONSTRAINT orderproductmap_pkey;
       public                 postgres    false    221            .           2606    16403    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    218            0           2606    16410    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    219            3           2606    16418 ,   orderproductmap orderproductmap_orderid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderproductmap
    ADD CONSTRAINT orderproductmap_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.orders(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.orderproductmap DROP CONSTRAINT orderproductmap_orderid_fkey;
       public               postgres    false    221    4654    218            4           2606    16423 .   orderproductmap orderproductmap_productid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderproductmap
    ADD CONSTRAINT orderproductmap_productid_fkey FOREIGN KEY (productid) REFERENCES public.products(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.orderproductmap DROP CONSTRAINT orderproductmap_productid_fkey;
       public               postgres    false    4656    219    221            �      x�34�4�4���\����@*F��� +.      �   I   x�3�,I-.)N�4202�50�52V02�24�26�30150��2�LN��KO-BSddbej�gllhia����� ���      �   H   x�3��P�I,(�/���,V ��<� ��Oj^~Y>�"q.cN��"$Y �˄�)3;I������ ��$�     